import type {
  CartesianChartDefinition,
  ChartDefinition,
  FunnelChartDefinition,
  GaugeChartDefinition,
  PieChartDefinition,
  RadarChartDefinition,
  RawEChartsDefinition,
  ScatterChartDefinition
} from "../types";

type EChartsOption = Record<string, unknown>;

function createTitle(definition: { title?: string }) {
  return definition.title ? { text: definition.title } : undefined;
}

function createCartesianBase(definition: CartesianChartDefinition): EChartsOption {
  const hasMultipleSeries = definition.series.length > 1;

  return {
    title: createTitle(definition),
    tooltip: { trigger: "axis" },
    legend: hasMultipleSeries
      ? {
          top: 32
        }
      : undefined,
    grid: {
      left: 48,
      right: 24,
      top: hasMultipleSeries ? 80 : 48,
      bottom: 48,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: definition.labels,
      name: definition.xAxisLabel
    },
    yAxis: {
      type: "value",
      name: definition.yAxisLabel
    }
  };
}

function cartesianToBarOption(definition: CartesianChartDefinition): EChartsOption {
  return {
    ...createCartesianBase(definition),
    series: definition.series.map((series) => ({
      name: series.label,
      type: "bar",
      data: series.data
    }))
  };
}

function cartesianToLineOption(definition: CartesianChartDefinition): EChartsOption {
  return {
    ...createCartesianBase(definition),
    series: definition.series.map((series) => ({
      name: series.label,
      type: "line",
      data: series.data,
      smooth: false
    }))
  };
}

function pieToOption(definition: PieChartDefinition): EChartsOption {
  return {
    title: createTitle(definition),
    tooltip: { trigger: "item" },
    legend: {
      bottom: 0
    },
    series: [
      {
        name: definition.title ?? "Pie chart",
        type: "pie",
        radius: "60%",
        center: ["50%", "45%"],
        data: definition.data.map((item) => ({
          name: item.label,
          value: item.value
        }))
      }
    ]
  };
}

function scatterToOption(definition: ScatterChartDefinition): EChartsOption {
  const hasMultipleSeries = definition.series.length > 1;

  return {
    title: createTitle(definition),
    tooltip: { trigger: "item" },
    legend: hasMultipleSeries
      ? {
          top: 32
        }
      : undefined,
    grid: {
      left: 48,
      right: 24,
      top: hasMultipleSeries ? 80 : 48,
      bottom: 48,
      containLabel: true
    },
    xAxis: {
      type: "value",
      name: definition.xAxisLabel
    },
    yAxis: {
      type: "value",
      name: definition.yAxisLabel
    },
    series: definition.series.map((series) => ({
      name: series.label,
      type: "scatter",
      data: series.data.map((point) => [point.x, point.y])
    }))
  };
}

function radarToOption(definition: RadarChartDefinition): EChartsOption {
  return {
    title: createTitle(definition),
    tooltip: { trigger: "item" },
    legend: definition.series.length > 1 ? { bottom: 0 } : undefined,
    radar: {
      indicator: definition.indicators.map((indicator) => ({
        name: indicator.label,
        max: indicator.max
      }))
    },
    series: [
      {
        name: definition.title ?? "Radar chart",
        type: "radar",
        data: definition.series.map((series) => ({
          name: series.label,
          value: series.data
        }))
      }
    ]
  };
}

function gaugeToOption(definition: GaugeChartDefinition): EChartsOption {
  return {
    title: createTitle(definition),
    tooltip: {
      formatter: "{a} <br/>{b}: {c}"
    },
    series: [
      {
        name: definition.title ?? "Gauge chart",
        type: "gauge",
        min: definition.min ?? 0,
        max: definition.max ?? 100,
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}"
        },
        data: [
          {
            name: definition.label,
            value: definition.value
          }
        ]
      }
    ]
  };
}

function funnelToOption(definition: FunnelChartDefinition): EChartsOption {
  return {
    title: createTitle(definition),
    tooltip: {
      trigger: "item"
    },
    legend: {
      bottom: 0
    },
    series: [
      {
        name: definition.title ?? "Funnel chart",
        type: "funnel",
        left: "10%",
        top: 48,
        bottom: 48,
        width: "80%",
        min: 0,
        max: Math.max(...definition.data.map((item) => item.value)),
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside"
        },
        data: definition.data.map((item) => ({
          name: item.label,
          value: item.value
        }))
      }
    ]
  };
}

function rawEChartsToOption(definition: RawEChartsDefinition): EChartsOption {
  return definition.option;
}

export function toEChartsOption(definition: ChartDefinition): EChartsOption {
  switch (definition.type) {
    case "bar":
      return cartesianToBarOption(definition);
    case "line":
      return cartesianToLineOption(definition);
    case "pie":
      return pieToOption(definition);
    case "scatter":
      return scatterToOption(definition);
    case "radar":
      return radarToOption(definition);
    case "gauge":
      return gaugeToOption(definition);
    case "funnel":
      return funnelToOption(definition);
    case "echarts":
      return rawEChartsToOption(definition);
    default:
      throw new Error(`Unsupported chart type: ${(definition as { type?: string }).type}`);
  }
}