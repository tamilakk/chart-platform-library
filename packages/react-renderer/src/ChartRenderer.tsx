import type { ChartDefinition } from "@chart-platform/core";
import {
  toEChartsOption,
  validateChartDefinition
} from "@chart-platform/core";
import ReactECharts from "echarts-for-react";

type ChartRendererProps = {
  definition: ChartDefinition;
  height?: number;
};

export function ChartRenderer({
  definition,
  height = 400
}: ChartRendererProps) {
  validateChartDefinition(definition);

  const option = toEChartsOption(definition);

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height }}
    />
  );
}