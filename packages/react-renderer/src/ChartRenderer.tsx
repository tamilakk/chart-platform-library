import { useMemo } from "react";
import type { ChartDefinition, ChartTheme, ThemeName } from "@chart-platform/core";
import {
  toEChartsOption,
  validateChartDefinition
} from "@chart-platform/core";
import ReactECharts from "echarts-for-react";

export interface ChartRendererProps {
  definition: ChartDefinition;
  height?: number;
  theme?: ChartTheme | ThemeName;
  "aria-label"?: string;
}

/**
 * Renders a chart from the shared chart definition.
 *
 * @param definition Chart definition to render.
 * @param height Optional chart height in pixels.
 * @param ariaLabel Accessible label for the chart. Defaults to the chart title when omitted.
 * @returns React chart component, or an error message when the definition is invalid.
 */
export function ChartRenderer({
  definition,
  height = 400,
  theme, "aria-label": ariaLabel
}: ChartRendererProps) {
  const result = useMemo(() => {
    try {
      validateChartDefinition(definition);
      return { option: toEChartsOption(definition, theme), error: null };
    } catch (err) {
      return {
        option: null,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  }, [definition, theme]);

  const style = useMemo(
    () => ({
      width: "100%",
      height
    }),
    [height]
  );

  if (result.error) {
    return (
      <div
        role="alert"
        style={{
          color: "#b91c1c",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 4,
          padding: "8px 12px",
          fontFamily: "monospace",
          fontSize: 13
        }}
      >
        Chart error: {result.error}
      </div>
    );
  }

  return (
    <div role="img" aria-label={ariaLabel ?? definition.title}>
      <ReactECharts option={result.option!} style={style} />
    </div>
  );
}