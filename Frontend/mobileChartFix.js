(() => {
  const L = window.LightweightCharts;
  if (!L || typeof L.createChart !== "function") return;

  const originalCreateChart = L.createChart.bind(L);

  L.createChart = function(container, options = {}) {
    container.style.width = "100%";
    container.style.maxWidth = "100%";
    container.style.minWidth = "0";
    container.style.position = "relative";

    const chart = originalCreateChart(container, {
      ...options,
      rightPriceScale: {
        ...(options.rightPriceScale || {}),
        visible: false,
        borderVisible: false,
        minimumWidth: 0,
      },
      timeScale: {
        ...(options.timeScale || {}),
        rightOffset: 2,
      },
    });

    const priceBadge = document.createElement("div");
    priceBadge.className = "mobile-chart-price-badge";
    Object.assign(priceBadge.style, {
      position: "absolute",
      right: "6px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: "8",
      padding: "4px 7px",
      borderRadius: "4px",
      background: "#64c7b7",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: "700",
      lineHeight: "1",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    });
    container.appendChild(priceBadge);

    const originalAddCandlestickSeries = chart.addCandlestickSeries.bind(chart);
    chart.addCandlestickSeries = function(seriesOptions = {}) {
      const series = originalAddCandlestickSeries({
        ...seriesOptions,
        lastValueVisible: false,
        priceFormat: {
          type: "custom",
          minMove: 0.00001,
          formatter: (price) => Number(price) >= 100
            ? Number(price).toFixed(2)
            : Number(price).toFixed(5),
        },
      });

      const originalSetData = series.setData.bind(series);
      series.setData = function(rows) {
        originalSetData(rows);
        const last = Array.isArray(rows) && rows.length ? rows[rows.length - 1] : null;
        if (!last || !Number.isFinite(Number(last.close))) {
          priceBadge.style.display = "none";
          return;
        }
        const price = Number(last.close);
        priceBadge.textContent = price >= 100 ? price.toFixed(2) : price.toFixed(5);
        priceBadge.style.display = "block";
        requestAnimationFrame(() => {
          const y = series.priceToCoordinate(price);
          if (Number.isFinite(y)) {
            const half = priceBadge.offsetHeight / 2;
            const clamped = Math.max(half + 4, Math.min(container.clientHeight - half - 4, y));
            priceBadge.style.top = `${clamped}px`;
            priceBadge.style.transform = "translateY(-50%)";
          }
        });
      };

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
          rightOffset: 2,
        },
      });
    };

    const resize = () => chart.resize(container.clientWidth, container.clientHeight);
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