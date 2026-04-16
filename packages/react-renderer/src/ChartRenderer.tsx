import { useMemo } from "react";
import type { ChartDefinition } from "@chart-platform/core";
import {
  toEChartsOption,
  validateChartDefinition
} from "@chart-platform/core";
import ReactECharts from "echarts-for-react";

export interface ChartRendererProps {
  definition: ChartDefinition;
  height?: number;
}

export function ChartRenderer({
  definition,
  height = 400
}: ChartRendererProps) {
  const option = useMemo(() => {
    validateChartDefinition(definition);
    return toEChartsOption(definition);
  }, [definition]);

  const style = useMemo(
    () => ({
      width: "100%",
      height
    }),
    [height]
  );

  return <ReactECharts option={option} style={style} />;
}