export const getLineOption = (name: string) => {
  return {
    grid: {
      top: 24,
      left: 8,
      right: 16,
      bottom: 16,
      containLabel: true,
    },
    legend: {
      top: 0,
      right: 16,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      padding: [0, 0, 0, 8],
      icon: "rect",
      textStyle: {
        fontSize: 12,
        color: "#3D3D3D",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#ABABAB",
          type: "dashed",
          width: 1,
          opacity: 1,
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E5E6EB",
          width: 0.6,
          type: "solid",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 6,
        color: "#4E5969",
        fontSize: 10,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#E5E6EB",
          width: 0.6,
          opacity: 1,
          type: "dashed",
        },
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      name: name,
      nameTextStyle: {
        fontSize: 10,
        color: "#828D99",
        align: "right",
        verticalAlign: "middle",
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#E5E6EB",
          width: 0.6,
        },
      },
      axisLabel: {
        color: "#4E5969",
        fontSize: 10,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#E5E6EB",
          width: 0.6,
          opacity: 1,
          type: "dashed",
        },
      },
    },
    color: ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"],
    series: [
      {
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 102, 255, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(0, 102, 255, 0)",
              },
            ],
          },
        },
        encode: {
          x: 0,
          y: 1,
          seriesName: 1,
        },
        z: 1,
      },
      {
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        smooth: true,
        encode: {
          x: 0,
          y: 2,
          seriesName: 2,
        },
        z: 2,
      },
      {
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        smooth: true,
        encode: {
          x: 0,
          y: 3,
          seriesName: 3,
        },
        z: 3,
      },
      {
        type: "line",
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        smooth: true,
        encode: {
          x: 0,
          y: 4,
          seriesName: 4,
        },
        z: 4,
      },
    ],
  };
};

export const waveOption = {
  grid: {
    top: 24,
    left: 8,
    right: 16,
    bottom: 16,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        color: "#ABABAB",
        type: "dashed",
        width: 1,
        opacity: 1,
      },
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      margin: 6,
      color: "#4E5969",
      fontSize: 10,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#E5E6EB",
        opacity: 1,
        type: "dashed",
      },
    },
  },
  yAxis: {
    type: "value",
    scale: true,
    name: 'mm/S2',
    nameTextStyle: {
      fontSize: 10,
      color: "#828D99",
      align: "right",
      verticalAlign: "middle",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
      },
    },
    axisLabel: {
      color: "#4E5969",
      fontSize: 10,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#E5E6EB",
        width: 0.6,
        opacity: 1,
        type: "dashed",
      },
    },
  },
  dataset: {},
  color: ["#0084FF", "#00B42A", "#F53F3F", "#FAAD14"],
  series: {
    type: "line",
    symbol: "circle",
    symbolSize: 8,
    showSymbol: false,
    smooth: false,
  },
};
