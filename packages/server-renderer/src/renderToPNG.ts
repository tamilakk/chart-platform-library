import sharp from "sharp";
import type { ChartDefinition, ChartTheme, ExportOptions, ThemeName } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

/**
 * Renders a chart definition to a PNG buffer.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @param theme Optional theme name or custom theme object. Defaults to the light theme.
 * @returns PNG image as a buffer.
 */
export async function renderToPNG(
  definition: ChartDefinition,
  options: ExportOptions,
  theme?: ChartTheme | ThemeName
): Promise<Buffer> {
  const svg = await renderToSVG(definition, options, theme);

  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}