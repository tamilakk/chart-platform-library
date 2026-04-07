import type {
  ChartDefinition,
  CartesianChartDefinition,
  PieChartDefinition
} from "../types";

type EChartsOption = Record<string, unknown>;

function createCartesianBase(definition: CartesianChartDefinition): EChartsOption {
  const hasMultipleSeries = definition.series.length > 1;

  return {
    title: definition.title ? { text: definition.title } : undefined,
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
    title: definition.title ? { text: definition.title } : undefined,
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

export function toEChartsOption(definition: ChartDefinition): EChartsOption {
  switch (definition.type) {
    case "bar":
      return cartesianToBarOption(definition);
    case "line":
      return cartesianToLineOption(definition);
    case "pie":
      return pieToOption(definition);
    default:
      throw new Error(`Unsupported chart type: ${(definition as { type?: string }).type}`);
  }
}