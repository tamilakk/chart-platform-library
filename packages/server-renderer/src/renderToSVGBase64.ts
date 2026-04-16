import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

export async function renderToSVGBase64(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<string> {
  const svg = await renderToSVG(definition, options);
  return Buffer.from(svg, "utf-8").toString("base64");
}