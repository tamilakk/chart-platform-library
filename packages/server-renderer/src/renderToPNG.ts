import sharp from "sharp";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

export async function renderToPNG(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<Buffer> {
  const svg = await renderToSVG(definition, options);

  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}