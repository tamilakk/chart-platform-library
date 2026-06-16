import type { ChartDefinition, ChartTheme, ExportOptions, ThemeName } from "@chart-platform/core";
import { renderToPNG } from "./renderToPNG";

/**
 * Renders a chart definition to a base64-encoded PNG string.
 *
 * @param definition Chart definition to render.
 * @param options Output settings for the export.
 * @param theme Optional theme name or custom theme object. Defaults to the light theme.
 * @returns PNG image encoded as a base64 string.
 */
export async function renderToPNGBase64(
  definition: ChartDefinition,
  options: ExportOptions,
  theme?: ChartTheme | ThemeName
): Promise<string> {
  const png = await renderToPNG(definition, options, theme);
  return png.toString("base64");
}