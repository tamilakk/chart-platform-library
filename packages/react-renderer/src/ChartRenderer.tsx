import ReactECharts from "echarts-for-react";
import type { ChartDefinition } from "@chart-platform/core";
import { toEChartsOption } from "@chart-platform/core";

type ChartRendererProps = {
  definition: ChartDefinition;
};

export function ChartRenderer({ definition }: ChartRendererProps) {
  const option = toEChartsOption(definition);

  return (
    <ReactECharts
      option={option}
      style={{
        width: definition.width ?? 800,
        height: definition.height ?? 400
      }}
    />
  );
}