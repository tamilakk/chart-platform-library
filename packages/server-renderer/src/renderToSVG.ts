import echarts = require("echarts");
import type { EChartsOption } from "echarts";
import type { ChartDefinition, ChartTheme, ExportOptions, ThemeName } from "@chart-platform/core";
import {
  toEChartsOption,
  validateChartDefinition,
  validateExportOptions
} from "@chart-platform/core";

/**
 * Renders a chart definition to an SVG string.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @param theme Optional theme name or custom theme object. Defaults to the light theme.
 * @returns SVG output as a string.
 */
export async function renderToSVG(
  definition: ChartDefinition,
  options: ExportOptions,
  theme?: ChartTheme | ThemeName
): Promise<string> {
  validateChartDefinition(definition);
  validateExportOptions(options);

  const chart = echarts.init(null, null, {
    renderer: "svg",
    ssr: true,
    width: options.width,
    height: options.height
  });

  try {
    const option: EChartsOption = {
      ...toEChartsOption(definition, theme),
      // ExportOptions.background takes priority over theme background
      ...(options.background ? { backgroundColor: options.background } : {})
    };

    chart.setOption(option);

    return chart.renderToSVGString();
  } finally {
    chart.dispose();
  }
}