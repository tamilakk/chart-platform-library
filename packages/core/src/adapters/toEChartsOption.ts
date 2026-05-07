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

// Simplified ECharts configuration type used by the adapter.
type EChartsOption = Record<string, unknown>;

/**
 * Creates a title config only when a title is provided.
 *
 * @param definition Chart definition with an optional title.
 * @returns ECharts title config or undefined.
 */
function createTitle(definition: { title?: string }) {
  return definition.title ? { text: definition.title } : undefined;
}

/**
 * Creates shared base config for Cartesian charts.
 *
 * @param definition Cartesian chart definition.
 * @returns Base ECharts config for bar and line charts.
 */
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

/**
 * Converts a bar chart definition to an ECharts option.
 *
 * @param definition Bar chart definition.
 * @returns ECharts option for a bar chart.
 */
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

/**
 * Converts a line chart definition to an ECharts option.
 *
 * @param definition Line chart definition.
 * @returns ECharts option for a line chart.
 */
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

/**
 * Converts a pie chart definition to an ECharts option.
 *
 * @param definition Pie chart definition.
 * @returns ECharts option for a pie chart.
 */
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

/**
 * Converts a scatter chart definition to an ECharts option.
 *
 * @param definition Scatter chart definition.
 * @returns ECharts option for a scatter chart.
 */
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

/**
 * Converts a radar chart definition to an ECharts option.
 *
 * @param definition Radar chart definition.
 * @returns ECharts option for a radar chart.
 */
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

/**
 * Converts a gauge chart definition to an ECharts option.
 *
 * @param definition Gauge chart definition.
 * @returns ECharts option for a gauge chart.
 */
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

/**
 * Converts a funnel chart definition to an ECharts option.
 *
 * @param definition Funnel chart definition.
 * @returns ECharts option for a funnel chart.
 */
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

/**
 * Returns a raw ECharts option without transformation.
 *
 * @param definition Raw ECharts definition.
 * @returns Original ECharts option.
 */
function rawEChartsToOption(definition: RawEChartsDefinition): EChartsOption {
  return definition.option;
}

/**
 * Converts the shared chart definition to an ECharts config.
 *
 * @param definition Shared chart definition.
 * @returns ECharts option for the selected chart type.
 */
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
      throw new Error(
        `Unsupported chart type: ${(definition as { type?: string }).type}`
      );
  }
}