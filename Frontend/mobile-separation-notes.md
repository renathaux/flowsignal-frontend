# Mobile dashboard separation

This branch separates the phone dashboard from the desktop dashboard.

## Desktop

- `index.html` remains the existing desktop application.
- Existing desktop styling and trading logic remain unchanged.

## Mobile

- `mobile.html` owns the phone dashboard markup.
- `mobile.css` owns the phone dashboard layout.
- `mobileDashboard.js` reads the existing FlowSignal backend and renders:
  - Daily P/L
  - Weekly P/L
  - Open trade count
  - Floating live P/L
  - EURUSD and XAUUSD signals
  - Active trade details
  - Candlestick chart and timeframes
  - Compact SMC summary
  - Fundamental Insight detail
  - V2 Shadow detail
  - Signal history detail

## Routing

`startup.js` sends authenticated phone-sized browsers to `mobile.html`. `?desktop=1` keeps the desktop dashboard available on a phone.

Direct unauthenticated visits to `mobile.html` return to `index.html`.

## Safety

This is frontend-only. No strategy, risk, order execution, broker, database, V1, or V2 trading logic is modified.

## Before merge

1. Test authenticated phone redirect.
2. Confirm desktop remains on `index.html`.
3. Confirm `/panel-data` populates P/L, signals, trade card, and chart.
4. Confirm `/fundamentals/insight` detail loads.
5. Confirm `/shadow/v2/summary` and `/shadow/v2/history` details load.
6. Confirm no Home-page vertical scrolling at normal iPhone viewport height.
7. Confirm `?desktop=1` works on phone.
