(function () {
  "use strict";

  function normalizeCandles(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map((c) => ({
      time: Number(c?.time),
      open: Number(c?.open),
      high: Number(c?.high),
      low: Number(c?.low),
      close: Number(c?.close),
    })).filter((c) => [c.time, c.open, c.high, c.low, c.close].every(Number.isFinite))
      .sort((a, b) => a.time - b.time);
  }

  function trueRange(candle, previous) {
    if (!previous) return Math.max(0, candle.high - candle.low);
    return Math.max(
      candle.high - candle.low,
      Math.abs(candle.high - previous.close),
      Math.abs(candle.low - previous.close),
    );
  }

  function atrSeries(candles, period = 14) {
    const trs = candles.map((candle, index) => trueRange(candle, candles[index - 1]));
    return trs.map((_, index) => {
      const start = Math.max(0, index - period + 1);
      const window = trs.slice(start, index + 1);
      return window.reduce((sum, value) => sum + value, 0) / Math.max(1, window.length);
    });
  }

  function detectRawSwings(candles, leftBars, rightBars) {
    const swings = [];
    if (candles.length < leftBars + rightBars + 1) return swings;

    for (let i = leftBars; i < candles.length - rightBars; i += 1) {
      const current = candles[i];
      const left = candles.slice(i - leftBars, i);
      const right = candles.slice(i + 1, i + 1 + rightBars);
      const confirmedIndex = i + rightBars;

      if (
        current.high > Math.max(...left.map((c) => c.high))
        && current.high >= Math.max(...right.map((c) => c.high))
      ) {
        swings.push({
          swing_type: "HIGH",
          index: i,
          confirmed_index: confirmedIndex,
          timestamp: current.time,
          confirmed_timestamp: candles[confirmedIndex].time,
          price: current.high,
        });
      }

      if (
        current.low < Math.min(...left.map((c) => c.low))
        && current.low <= Math.min(...right.map((c) => c.low))
      ) {
        swings.push({
          swing_type: "LOW",
          index: i,
          confirmed_index: confirmedIndex,
          timestamp: current.time,
          confirmed_timestamp: candles[confirmedIndex].time,
          price: current.low,
        });
      }
    }

    return swings.sort((a, b) => a.confirmed_index - b.confirmed_index || a.index - b.index);
  }

  function filterMajorSwings(rawSwings, candles, atr, options = {}) {
    const minSwingAtr = Math.max(0.25, Number(options.minSwingAtr) || 0.8);
    const minBarsBetween = Math.max(1, Number(options.minBarsBetween) || 3);
    const accepted = [];

    rawSwings.forEach((candidate) => {
      if (!accepted.length) {
        accepted.push(candidate);
        return;
      }

      const last = accepted[accepted.length - 1];
      if (candidate.swing_type === last.swing_type) {
        const moreExtreme = candidate.swing_type === "HIGH"
          ? candidate.price > last.price
          : candidate.price < last.price;
        if (moreExtreme) accepted[accepted.length - 1] = candidate;
        return;
      }

      const barDistance = Math.abs(candidate.index - last.index);
      const referenceAtr = Math.max(
        Number(atr[candidate.index]) || 0,
        Number(atr[last.index]) || 0,
      );
      const requiredMove = referenceAtr * minSwingAtr;
      const actualMove = Math.abs(candidate.price - last.price);

      if (barDistance >= minBarsBetween && actualMove >= requiredMove) {
        accepted.push(candidate);
      }
    });

    return accepted;
  }

  function detectSwings(rows, leftBars = 3, rightBars = 3, options = {}) {
    const candles = normalizeCandles(rows);
    const atr = atrSeries(candles, Math.max(5, Number(options.atrPeriod) || 14));
    const raw = detectRawSwings(candles, leftBars, rightBars);
    return filterMajorSwings(raw, candles, atr, options);
  }

  function analyze(rows, options = {}) {
    const leftBars = Math.max(2, Number(options.leftBars) || 3);
    const rightBars = Math.max(2, Number(options.rightBars) || 3);
    const atrPeriod = Math.max(5, Number(options.atrPeriod) || 14);
    const minSwingAtr = Math.max(0.25, Number(options.minSwingAtr) || 0.8);
    const breakBufferAtr = Math.max(0, Number(options.breakBufferAtr) || 0.10);
    const minBarsBetween = Math.max(1, Number(options.minBarsBetween) || 3);
    const candles = normalizeCandles(rows);

    // Never use the newest forming candle for structure confirmation.
    const closed = candles.length > 1 ? candles.slice(0, -1) : candles;
    const atr = atrSeries(closed, atrPeriod);
    const rawSwings = detectRawSwings(closed, leftBars, rightBars);
    const swings = filterMajorSwings(rawSwings, closed, atr, { minSwingAtr, minBarsBetween });

    let latestHigh = null;
    let latestLow = null;
    let brokenHighKey = null;
    let brokenLowKey = null;
    let bias = "NEUTRAL";
    const events = [];
    const byConfirmation = new Map();

    swings.forEach((swing) => {
      const bucket = byConfirmation.get(swing.confirmed_index) || [];
      bucket.push(swing);
      byConfirmation.set(swing.confirmed_index, bucket);
    });

    closed.forEach((candle, index) => {
      (byConfirmation.get(index) || []).forEach((swing) => {
        if (swing.swing_type === "HIGH") {
          latestHigh = swing;
          brokenHighKey = null;
        } else {
          latestLow = swing;
          brokenLowKey = null;
        }
      });

      const currentAtr = Number(atr[index]) || 0;
      const breakBuffer = currentAtr * breakBufferAtr;

      if (latestHigh) {
        const key = `${latestHigh.timestamp}:${latestHigh.price}`;
        const directionalClose = candle.close > candle.open;
        if (
          directionalClose
          && candle.close > latestHigh.price + breakBuffer
          && brokenHighKey !== key
        ) {
          const previousBias = bias;
          const eventType = bias === "BEARISH" ? "CHOCH" : "BOS";
          bias = "BULLISH";
          events.push({
            event_type: eventType,
            direction: "BULLISH",
            timestamp: candle.time,
            close: candle.close,
            broken_swing_timestamp: latestHigh.timestamp,
            broken_level: latestHigh.price,
            previous_bias: previousBias,
            new_bias: bias,
            atr: currentAtr,
            break_buffer: breakBuffer,
            structure_grade: "MAJOR",
          });
          brokenHighKey = key;
        }
      }

      if (latestLow) {
        const key = `${latestLow.timestamp}:${latestLow.price}`;
        const directionalClose = candle.close < candle.open;
        if (
          directionalClose
          && candle.close < latestLow.price - breakBuffer
          && brokenLowKey !== key
        ) {
          const previousBias = bias;
          const eventType = bias === "BULLISH" ? "CHOCH" : "BOS";
          bias = "BEARISH";
          events.push({
            event_type: eventType,
            direction: "BEARISH",
            timestamp: candle.time,
            close: candle.close,
            broken_swing_timestamp: latestLow.timestamp,
            broken_level: latestLow.price,
            previous_bias: previousBias,
            new_bias: bias,
            atr: currentAtr,
            break_buffer: breakBuffer,
            structure_grade: "MAJOR",
          });
          brokenLowKey = key;
        }
      }
    });

    return {
      bias,
      last_swing_high: latestHigh,
      last_swing_low: latestLow,
      swings,
      events,
      closed_candle_count: closed.length,
      source: "browser_closed_chart_candles_major_structure",
      observation_only: true,
      affects_strategy: false,
      config: {
        left_bars: leftBars,
        right_bars: rightBars,
        atr_period: atrPeriod,
        min_swing_atr: minSwingAtr,
        break_buffer_atr: breakBufferAtr,
        min_bars_between_swings: minBarsBetween,
        structure_grade: "MAJOR",
        closed_candles_only: true,
        repainting: false,
      },
    };
  }

  window.FlowSignalSmcLocalEngine = { analyze, detectSwings };
})();
