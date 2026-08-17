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

  function detectSwings(rows, leftBars = 2, rightBars = 2) {
    const candles = normalizeCandles(rows);
    const swings = [];
    if (candles.length < leftBars + rightBars + 1) return swings;

    for (let i = leftBars; i < candles.length - rightBars; i += 1) {
      const current = candles[i];
      const left = candles.slice(i - leftBars, i);
      const right = candles.slice(i + 1, i + 1 + rightBars);
      const leftHigh = Math.max(...left.map((c) => c.high));
      const rightHigh = Math.max(...right.map((c) => c.high));
      const leftLow = Math.min(...left.map((c) => c.low));
      const rightLow = Math.min(...right.map((c) => c.low));
      const confirmedIndex = i + rightBars;

      if (current.high > leftHigh && current.high >= rightHigh) {
        swings.push({
          swing_type: "HIGH",
          index: i,
          confirmed_index: confirmedIndex,
          timestamp: current.time,
          confirmed_timestamp: candles[confirmedIndex].time,
          price: current.high,
        });
      }
      if (current.low < leftLow && current.low <= rightLow) {
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

  function analyze(rows, options = {}) {
    const leftBars = Math.max(1, Number(options.leftBars) || 2);
    const rightBars = Math.max(1, Number(options.rightBars) || 2);
    const candles = normalizeCandles(rows);

    // The chart history may contain the forming candle. Never use the newest
    // candle for structure confirmation so the visual indicator cannot repaint.
    const closed = candles.length > 1 ? candles.slice(0, -1) : candles;
    const swings = detectSwings(closed, leftBars, rightBars);

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

      if (latestHigh) {
        const key = `${latestHigh.timestamp}:${latestHigh.price}`;
        if (candle.close > latestHigh.price && brokenHighKey !== key) {
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
          });
          brokenHighKey = key;
        }
      }

      if (latestLow) {
        const key = `${latestLow.timestamp}:${latestLow.price}`;
        if (candle.close < latestLow.price && brokenLowKey !== key) {
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
      source: "browser_closed_chart_candles",
      observation_only: true,
      affects_strategy: false,
      config: {
        left_bars: leftBars,
        right_bars: rightBars,
        closed_candles_only: true,
        repainting: false,
      },
    };
  }

  window.FlowSignalSmcLocalEngine = { analyze, detectSwings };
})();
