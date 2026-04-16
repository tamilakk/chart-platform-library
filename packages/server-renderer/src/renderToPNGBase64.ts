import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToPNG } from "./renderToPNG";

export async function renderToPNGBase64(
  definition: ChartDefinition,
  options: ExportOptions
): Promise<string> {
  const png = await renderToPNG(definition, options);
  return png.toString("base64");
}