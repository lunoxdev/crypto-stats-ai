import { type Data } from "@/types";

export const timeframes = ["1D", "7D", "1M", "1Y"];

export const getChartOptions = (comparedCrypto: Data | null) => ({
  chart: {
    id: "crypto-chart",
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  xaxis: {
    type: "datetime" as "datetime",
    labels: {
      datetimeUTC: false,
      style: {
        colors: "#A0AEC0", // gray.400
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: comparedCrypto
    ? [
        {
          labels: {
            formatter: (value: number) => `$${value.toFixed(2)}`,
            style: {
              colors: "#0EA5E9", // sky.500
            },
          },
          tooltip: {
            enabled: true,
          },
          seriesName: "main-crypto",
        },
        {
          opposite: true,
          labels: {
            formatter: (value: number) => `$${value.toFixed(2)}`,
            style: {
              colors: "#EF4444", // red.500
            },
          },
          tooltip: {
            enabled: true,
          },
          seriesName: "compared-crypto",
        },
      ]
    : {
        labels: {
          formatter: (value: number) => `$${value.toFixed(2)}`,
          style: {
            colors: "#A0AEC0", // gray.400
          },
        },
        tooltip: {
          enabled: true,
        },
      },
  grid: {
    borderColor: "#4A5568", // gray.700
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  colors: ["#6366F1", "#EF4444"], // indigo.500, red.500
  stroke: {
    width: 2,
    curve: "smooth" as "smooth",
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "dd MMM HH:mm",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    position: "top" as "top",
    horizontalAlign: "left" as "left",
    labels: {
      colors: "#A0AEC0",
    },
  },
  markers: {
    size: 0,
  },
});

export const getSeries = (
  crypto: Data | null,
  chartData: number[][],
  comparedCrypto: Data | null,
  comparisonChartData: number[][]
) => {
  const s = [
    {
      name: crypto?.symbol || "",
      data: chartData,
      yaxisIndex: 0,
    },
  ];

  if (comparedCrypto) {
    s.push({
      name: comparedCrypto.symbol,
      data: comparisonChartData,
      yaxisIndex: 1,
    });
  }
  return s;
};
