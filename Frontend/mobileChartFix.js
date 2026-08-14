(() => {
  const L = window.LightweightCharts;
  if (!L || typeof L.createChart !== "function") return;

  const originalCreateChart = L.createChart.bind(L);

  L.createChart = function(container, options = {}) {
    const chart = originalCreateChart(container, {
      ...options,
      rightPriceScale: {
        ...(options.rightPriceScale || {}),
        minimumWidth: 86,
        entireTextOnly: true,
      },
      timeScale: {
        ...(options.timeScale || {}),
        rightOffset: 4,
      },
    });

    const originalAddCandlestickSeries = chart.addCandlestickSeries.bind(chart);
    chart.addCandlestickSeries = function(seriesOptions = {}) {
      return originalAddCandlestickSeries({
        ...seriesOptions,
        priceFormat: {
          type: "custom",
          minMove: 0.00001,
          formatter: (price) => Number(price) >= 100 ? Number(price).toFixed(2) : Number(price).toFixed(5),
        },
      });
    };

    const originalApplyOptions = chart.applyOptions.bind(chart);
    chart.applyOptions = function(nextOptions = {}) {
      return originalApplyOptions({
        ...nextOptions,
        rightPriceScale: {
          ...(nextOptions.rightPriceScale || {}),
          minimumWidth: 86,
          entireTextOnly: true,
        },
      });
    };

    return chart;
  };
})();