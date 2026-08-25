/*
 * FlowSignal SMC structure engine.
 * Adapted from "SMC Structures and FVG" © LudoGH68, MPL-2.0.
 * FVG logic intentionally excluded.
 */
(function () {
  "use strict";

  const LOOKBACK = 10;
  const FIB_LEVELS = [0.786, 0.705, 0.618, 0.5, 0.382];
  const FIFTEEN_MINUTE_STRUCTURE_POINTS = 100;

  function normalizedTimeframe(value) {
    return String(value || "").trim().toLowerCase();
  }

  function structuralPointSize(options = {}) {
    const value = Number(options.pointSize ?? options.tickSize ?? options.minMove);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  function createStructureAcceptance(options = {}) {
    const timeframe = normalizedTimeframe(options.timeframe);
    const pointSize = structuralPointSize(options);
    const minimumDistance = timeframe === "15m" && pointSize
      ? FIFTEEN_MINUTE_STRUCTURE_POINTS * pointSize
      : 0;
    let lastAcceptedLevel = null;
    let direction = 0;

    return {
      evaluate(candidateLevel, newDirection) {
        const level = Number(candidateLevel);
        const previousDirection = direction;
        const distance = lastAcceptedLevel == null ? null : Math.abs(level - lastAcceptedLevel);
        const accepted = Number.isFinite(level) && (
          minimumDistance === 0
          || lastAcceptedLevel == null
          || distance + (pointSize * 1e-7) >= minimumDistance
        );
        const eventType = previousDirection === newDirection ? "BOS" : "CHOCH";

        if (accepted) {
          lastAcceptedLevel = level;
          direction = newDirection;
        }

        return {
          accepted,
          eventType,
          previousDirection,
          newDirection,
          candidateLevel: level,
          lastAcceptedLevel,
          distance,
          minimumDistance,
        };
      },
      getDirection: () => direction,
      getLastAcceptedLevel: () => lastAcceptedLevel,
      getMinimumDistance: () => minimumDistance,
    };
  }

  function normalizeCandles(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map((c) => ({
      time: Number(c?.time), open: Number(c?.open), high: Number(c?.high),
      low: Number(c?.low), close: Number(c?.close),
    })).filter((c) => [c.time, c.open, c.high, c.low, c.close].every(Number.isFinite))
      .sort((a, b) => a.time - b.time);
  }

  function highestIndex(candles, endIndex, lookback = LOOKBACK) {
    const start = Math.max(0, endIndex - lookback + 1);
    let idx = start;
    for (let i = start + 1; i <= endIndex; i += 1) {
      if (candles[i].high >= candles[idx].high) idx = i;
    }
    return idx;
  }

  function lowestIndex(candles, endIndex, lookback = LOOKBACK) {
    const start = Math.max(0, endIndex - lookback + 1);
    let idx = start;
    for (let i = start + 1; i <= endIndex; i += 1) {
      if (candles[i].low <= candles[idx].low) idx = i;
    }
    return idx;
  }

  // Pine's get_structure_highest_bar/get_structure_lowest_bar prefer a local
  // turning point inside the 10-bar window, falling back to the absolute extreme.
  function structureHighestIndex(candles, endIndex, lookback = LOOKBACK) {
    const start = Math.max(0, endIndex - lookback + 1);
    const maxIdx = highestIndex(candles, endIndex, lookback);
    let chosen = null;
    for (let i = endIndex - 1; i >= Math.max(start + 1, 1); i -= 1) {
      if (i + 1 > endIndex) continue;
      if (candles[i].high > candles[i - 1].high && candles[i + 1].high <= candles[i].high && i >= maxIdx) {
        chosen = i;
      }
    }
    return chosen == null ? maxIdx : chosen;
  }

  function structureLowestIndex(candles, endIndex, lookback = LOOKBACK) {
    const start = Math.max(0, endIndex - lookback + 1);
    const minIdx = lowestIndex(candles, endIndex, lookback);
    let chosen = null;
    for (let i = endIndex - 1; i >= Math.max(start + 1, 1); i -= 1) {
      if (i + 1 > endIndex) continue;
      if (candles[i].low < candles[i - 1].low && candles[i + 1].low >= candles[i].low && i >= minIdx) {
        chosen = i;
      }
    }
    return chosen == null ? minIdx : chosen;
  }

  function fibPayload(direction, structureHigh, structureLow, highStart, lowStart, candles) {
    const range = Math.abs(structureHigh - structureLow);
    if (!Number.isFinite(range) || range <= 0) return [];
    return FIB_LEVELS.map((value) => {
      const price = direction === 1
        ? structureHigh - (range - range * value)
        : structureLow + (range - range * value);
      const startIndex = direction === 1 ? highStart : lowStart;
      return {
        value,
        price,
        start_index: startIndex,
        start_timestamp: candles[startIndex]?.time ?? candles[candles.length - 1]?.time,
      };
    });
  }

  function analyze(rows, options = {}) {
    const candlesAll = normalizeCandles(rows);
    // FlowSignal chart includes the forming candle. Pine evaluates bar closes;
    // exclude the newest bar so the visual structure does not repaint intrabar.
    const candles = options.includeForming ? candlesAll : (candlesAll.length > 1 ? candlesAll.slice(0, -1) : candlesAll);
    if (!candles.length) {
      return { bias: "NEUTRAL", events: [], current_structure: null, fib_levels: [], swings: [], closed_candle_count: 0 };
    }

    let structureHigh = candles[0].high;
    let structureLow = candles[0].low;
    let structureHighStartIndex = 0;
    let structureLowStartIndex = 0;
    // Pine mapping: 1=bearish, 2=bullish, 0=unset. On 15m this tracks only
    // accepted structural events; rejected internal breaks cannot flip it.
    let structureDirection = 0;
    const structureAcceptance = createStructureAcceptance(options);
    const events = [];

    for (let i = 1; i < candles.length; i += 1) {
      const candle = candles[i];
      const highBreakPrice = candle.close; // Pine default: body/close break.
      const lowBreakPrice = candle.close;
      const prev1 = candles[i - 1];
      const prev2 = candles[i - 2];
      const prev3 = candles[i - 3];

      const enoughAfterLowStart = i - 1 > structureLowStartIndex
        && i - 2 > structureLowStartIndex
        && i - 3 > structureLowStartIndex;
      const enoughAfterHighStart = i - 1 > structureHighStartIndex
        && i - 2 > structureHighStartIndex
        && i - 3 > structureHighStartIndex;

      const lowBroken = (
        lowBreakPrice < structureLow
        && prev1 && prev2 && prev3
        && prev1.close >= structureLow && prev2.close >= structureLow && prev3.close >= structureLow
        && enoughAfterLowStart
      ) || (structureDirection === 2 && lowBreakPrice < structureLow);

      const highBroken = (
        highBreakPrice > structureHigh
        && prev1 && prev2 && prev3
        && prev1.close <= structureHigh && prev2.close <= structureHigh && prev3.close <= structureHigh
        && enoughAfterHighStart
      ) || (structureDirection === 1 && highBreakPrice > structureHigh);

      if (lowBroken) {
        const acceptance = structureAcceptance.evaluate(structureLow, 1);
        if (acceptance.accepted) {
          events.push({
            event_type: acceptance.eventType,
            direction: "BEARISH",
            timestamp: candle.time,
            close: candle.close,
            broken_swing_timestamp: candles[structureLowStartIndex].time,
            broken_level: structureLow,
            structure_start_index: structureLowStartIndex,
            break_index: i,
            previous_direction: acceptance.previousDirection,
            new_direction: 1,
          });
          structureDirection = acceptance.newDirection;
        }
        structureHighStartIndex = structureHighestIndex(candles, i, LOOKBACK);
        structureLowStartIndex = i;
        structureHigh = candles[structureHighStartIndex].high;
        structureLow = candle.low;
      } else if (highBroken) {
        const acceptance = structureAcceptance.evaluate(structureHigh, 2);
        if (acceptance.accepted) {
          events.push({
            event_type: acceptance.eventType,
            direction: "BULLISH",
            timestamp: candle.time,
            close: candle.close,
            broken_swing_timestamp: candles[structureHighStartIndex].time,
            broken_level: structureHigh,
            structure_start_index: structureHighStartIndex,
            break_index: i,
            previous_direction: acceptance.previousDirection,
            new_direction: 2,
          });
          structureDirection = acceptance.newDirection;
        }
        structureHighStartIndex = i;
        structureLowStartIndex = structureLowestIndex(candles, i, LOOKBACK);
        structureHigh = candle.high;
        structureLow = candles[structureLowStartIndex].low;
      } else {
        if (candle.high > structureHigh && (structureDirection === 0 || structureDirection === 2)) {
          // Mirrors the Pine body's anti-premature-break guard.
          const canUpdate = !prev1 || !prev2 || !prev3 || !(
            i - 1 > structureHighStartIndex && i - 2 > structureHighStartIndex && i - 3 > structureHighStartIndex
          );
          if (canUpdate) {
            structureHigh = candle.high;
            structureHighStartIndex = i;
          }
        } else if (candle.low < structureLow && (structureDirection === 0 || structureDirection === 1)) {
          const canUpdate = !prev1 || !prev2 || !prev3 || !(
            i - 1 > structureLowStartIndex && i - 2 > structureLowStartIndex && i - 3 > structureLowStartIndex
          );
          if (canUpdate) {
            structureLow = candle.low;
            structureLowStartIndex = i;
          }
        }
      }
    }

    const bias = structureDirection === 2 ? "BULLISH" : structureDirection === 1 ? "BEARISH" : "NEUTRAL";
    const currentStructure = {
      direction: structureDirection,
      bias,
      high: structureHigh,
      low: structureLow,
      high_start_index: structureHighStartIndex,
      low_start_index: structureLowStartIndex,
      high_start_timestamp: candles[structureHighStartIndex].time,
      low_start_timestamp: candles[structureLowStartIndex].time,
      end_timestamp: candles[candles.length - 1].time,
      range: Math.abs(structureHigh - structureLow),
    };

    return {
      bias,
      events,
      current_structure: currentStructure,
      fib_levels: fibPayload(structureDirection, structureHigh, structureLow, structureHighStartIndex, structureLowStartIndex, candles),
      swings: [],
      closed_candle_count: candles.length,
      source: "ludogh68_structure_port_no_fvg",
      observation_only: true,
      affects_strategy: false,
      config: {
        lookback: LOOKBACK,
        break_with_candle_body: true,
        current_structure: true,
        fib_values: FIB_LEVELS,
        fvg: false,
        closed_candles_only: true,
        timeframe: normalizedTimeframe(options.timeframe) || null,
        point_size: structuralPointSize(options),
        minimum_structure_points: normalizedTimeframe(options.timeframe) === "15m"
          ? FIFTEEN_MINUTE_STRUCTURE_POINTS
          : 0,
        last_accepted_structure_level: structureAcceptance.getLastAcceptedLevel(),
      },
    };
  }

  window.FlowSignalSmcLocalEngine = { analyze, normalizeCandles, createStructureAcceptance };
})();
