import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

/**
 * Renders a chart definition to a base64-encoded SVG string.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @returns SVG image encoded as a base64 string.
 */
export async function renderToSVGBase64(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<string> {
  const svg = await renderToSVG(definition, options);
  return Buffer.from(svg, "utf-8").toString("base64");
}