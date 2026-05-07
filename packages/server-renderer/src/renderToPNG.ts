import sharp from "sharp";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

/**
 * Renders a chart definition to a PNG buffer.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @returns PNG image as a buffer.
 */
export async function renderToPNG(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<Buffer> {
  const svg = await renderToSVG(definition, options);

  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}