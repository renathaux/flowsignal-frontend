(() => {
  const L = window.LightweightCharts;
  if (!L || typeof L.createChart !== "function") return;

  const originalCreateChart = L.createChart.bind(L);

  L.createChart = function(container, options = {}) {
    // The chart must consume the full mobile card width. Keep only the
    // minimum gutter needed for a complete price label on the right.
    container.style.width = "100%";
    container.style.maxWidth = "100%";
    container.style.minWidth = "0";

    const chart = originalCreateChart(container, {
      ...options,
      rightPriceScale: {
        ...(options.rightPriceScale || {}),
        visible: true,
        minimumWidth: 58,
        entireTextOnly: true,
      },
      timeScale: {
        ...(options.timeScale || {}),
        rightOffset: 2,
      },
    });

    const originalAddCandlestickSeries = chart.addCandlestickSeries.bind(chart);
    chart.addCandlestickSeries = function(seriesOptions = {}) {
      return originalAddCandlestickSeries({
        ...seriesOptions,
        priceFormat: {
          type: "custom",
          minMove: 0.00001,
          formatter: (price) => Number(price) >= 100
            ? Number(price).toFixed(2)
            : Number(price).toFixed(5),
        },
      });
    };

    const originalApplyOptions = chart.applyOptions.bind(chart);
    chart.applyOptions = function(nextOptions = {}) {
      return originalApplyOptions({
        ...nextOptions,
        rightPriceScale: {
          ...(nextOptions.rightPriceScale || {}),
          visible: true,
          minimumWidth: 58,
          entireTextOnly: true,
        },
        timeScale: {
          ...(nextOptions.timeScale || {}),
          rightOffset: 2,
        },
      });
    };

    requestAnimationFrame(() => {
      chart.resize(container.clientWidth, container.clientHeight);
    });

    return chart;
  };
})();