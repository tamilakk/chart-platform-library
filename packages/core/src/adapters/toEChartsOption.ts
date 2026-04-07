import type {
  ChartDefinition,
  CartesianChartDefinition,
  PieChartDefinition
} from "../types";

type EChartsOption = Record<string, unknown>;

function cartesianToBarOption(definition: CartesianChartDefinition): EChartsOption {
  return {
    title: definition.title ? { text: definition.title } : undefined,
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: definition.labels,
      name: definition.xAxisLabel
    },
    yAxis: {
      type: "value",
      name: definition.yAxisLabel
    },
    series: definition.series.map((series) => ({
      name: series.label,
      type: "bar",
      data: series.data
    }))
  };
}

function cartesianToLineOption(definition: CartesianChartDefinition): EChartsOption {
  return {
    title: definition.title ? { text: definition.title } : undefined,
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: definition.labels,
      name: definition.xAxisLabel
    },
    yAxis: {
      type: "value",
      name: definition.yAxisLabel
    },
    series: definition.series.map((series) => ({
      name: series.label,
      type: "line",
      data: series.data
    }))
  };
}

function pieToOption(definition: PieChartDefinition): EChartsOption {
  return {
    title: definition.title ? { text: definition.title } : undefined,
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
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