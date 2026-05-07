import echarts = require("echarts");
import type { EChartsOption } from "echarts";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
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
 * @returns SVG output as a string.
 */
export async function renderToSVG(
  definition: ChartDefinition,
  options: ExportOptions
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
      ...toEChartsOption(definition),
      ...(options.background ? { backgroundColor: options.background } : {})
    };

    chart.setOption(option);

    return chart.renderToSVGString();
  } finally {
    chart.dispose();
  }
}