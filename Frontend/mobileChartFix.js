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

    window.FlowSignalMobileChart = chart;

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

      window.FlowSignalMobileCandleSeries = series;
      document.dispatchEvent(new CustomEvent("flowsignal:mobile-chart-ready"));
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

  const backendBase = location.hostname === "127.0.0.1" || location.hostname === "localhost"
    ? "http://127.0.0.1:8001"
    : "https://flowsignal-backend-3.onrender.com";

  let healthCheckRunning = false;
  async function refreshBackendHealth() {
    if (healthCheckRunning) return;
    healthCheckRunning = true;
    const badge = document.getElementById("mobileConnection");
    try {
      const response = await fetch(`${backendBase}/panel-data`, {
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`panel ${response.status}`);
      if (badge) {
        badge.textContent = "● LIVE";
        badge.classList.remove("negative");
        badge.title = "Backend connected";
      }
    } catch (error) {
      if (badge) {
        badge.textContent = "Connection issue";
        badge.classList.add("negative");
        badge.title = error?.message || "Backend unavailable";
      }
    } finally {
      healthCheckRunning = false;
    }
  }

  window.addEventListener("load", refreshBackendHealth);
  window.addEventListener("pageshow", refreshBackendHealth);
  setInterval(refreshBackendHealth, 5000);
})();