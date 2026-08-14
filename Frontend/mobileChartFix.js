(() => {
  const L = window.LightweightCharts;
  if (!L || typeof L.createChart !== "function") return;

  const originalCreateChart = L.createChart.bind(L);

  L.createChart = function(container, options = {}) {
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.maxWidth = "100%";
    container.style.minWidth = "0";
    container.style.minHeight = "0";
    container.style.position = "relative";

    const chart = originalCreateChart(container, {
      ...options,
      width: container.clientWidth,
      height: container.clientHeight,
      rightPriceScale: {
        ...(options.rightPriceScale || {}),
        visible: false,
        borderVisible: false,
        minimumWidth: 0,
      },
      timeScale: {
        ...(options.timeScale || {}),
        rightOffset: 0,
      },
    });

    const originalAddCandlestickSeries = chart.addCandlestickSeries.bind(chart);
    chart.addCandlestickSeries = function(seriesOptions = {}) {
      const series = originalAddCandlestickSeries({
        ...seriesOptions,
        priceScaleId: "",
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
          type: "custom",
          minMove: 0.00001,
          formatter: (price) => Number(price) >= 100
            ? Number(price).toFixed(2)
            : Number(price).toFixed(5),
        },
      });

      try {
        series.priceScale().applyOptions({
          autoScale: true,
          scaleMargins: { top: 0.1, bottom: 0.12 },
        });
      } catch (_) {}

      return series;
    };

    const originalApplyOptions = chart.applyOptions.bind(chart);
    chart.applyOptions = function(nextOptions = {}) {
      return originalApplyOptions({
        ...nextOptions,
        rightPriceScale: {
          ...(nextOptions.rightPriceScale || {}),
          visible: false,
          borderVisible: false,
          minimumWidth: 0,
        },
        timeScale: {
          ...(nextOptions.timeScale || {}),
          rightOffset: 0,
        },
      });
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      chart.resize(width, height);
    };

    requestAnimationFrame(resize);
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(resize);
      observer.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    return chart;
  };
})();