# FlowSignal SMC Indicator

This folder owns the Smart Money Concepts indicator UI/overlay code.

Safety boundary:
- Indicator rendering is isolated from the main dashboard script.
- It does not place, modify, or close trades.
- Strategy integration must consume explicit SMC outputs rather than reading chart drawings.
- Live-candle rendering remains a separate chart concern.

Planned modules:
- `smc-indicator.js` — indicator lifecycle and public API.
- `smc-renderer.js` — BOS/CHoCH/swing/zone drawing only.
- `smc.css` — indicator controls/labels only.
