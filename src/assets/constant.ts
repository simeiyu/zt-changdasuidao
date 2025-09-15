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
    left: 16,
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

export const radarOption = {
    radar: {
      center: ["50%", "50%"],
      radius: "74%",
      axisNameGap: 8,
      axisName: {
        color: "#1C2126",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#C2C7CC",
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#D8D8D8",
          width: 2,
        }
      },
      splitArea: {
        areaStyle: {
          color: "#4AA8FF",
          opacity: 0.1
        }
      },
      indicator: [{text: '1', max: 1}, {text: '2', max: 1}, {text: '3', max: 1}, {text: '4', max: 1}, {text: '5', max: 1}, {text: '6', max: 1}, {text: '7', max: 1}, {text: '8', max: 1}, {text: '9', max: 1}, {text: '10', max: 1}, {text: '11', max: 1}, {text: '12', max: 1}, {text: '13', max: 1}, {text: '14', max: 1}]
    },
    series: [{
      name: 'xxx',
      type: 'radar',
      symbolSize: 0,
      lineStyle: {
        color: '#C2C7CC',
        width: 2,
      },
      data: [
        {
          value: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          name: 'A'
        },
      ]
    }, {
      name: 'xxx',
      type: 'radar',
      symbolSize: 0,
      lineStyle: {
        color: '#0084FF',
        width: 2,
      },
      areaStyle: {
        color: '#2EA1FF',
        opacity: 0.4,
      },
      data: [
        {
          value: [0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
          name: 'Allocated Budget'
        }
      ]
    }],
}
