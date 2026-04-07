import * as echarts from "echarts";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import {
  toEChartsOption,
  validateChartDefinition,
  validateExportOptions
} from "@chart-platform/core";

export async function renderToSVG(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<string> {
  validateChartDefinition(definition);
  validateExportOptions(options);

  const chart = echarts.init(null, undefined, {
    renderer: "svg",
    ssr: true,
    width: options.width,
    height: options.height
  });

  const option = toEChartsOption(definition) as Record<string, unknown>;

  if (options.background) {
    option.backgroundColor = options.background;
  }

  chart.setOption(option);

  const svg = chart.renderToSVGString();
  chart.dispose();

  return svg;
}