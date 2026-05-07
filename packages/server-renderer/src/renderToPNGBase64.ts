import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToPNG } from "./renderToPNG";

/**
 * Renders a chart definition to a base64-encoded PNG string.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @returns PNG image encoded as a base64 string.
 */
export async function renderToPNGBase64(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<string> {
  const png = await renderToPNG(definition, options);
  return png.toString("base64");
}