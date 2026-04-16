import { renderToPNG, renderToSVG } from "./index";
import { demoCharts, type ExportOptions } from "@chart-platform/core";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const outputDir = "tmp";
  await mkdir(outputDir, { recursive: true });

  for (const [key, chart] of Object.entries(demoCharts)) {
    const baseName = slugify(chart.title || key);

    const svg = await renderToSVG(chart, exportOptions);
    const png = await renderToPNG(chart, exportOptions);

    await writeFile(join(outputDir, `${baseName}.svg`), svg, "utf-8");
    await writeFile(join(outputDir, `${baseName}.png`), png);

    console.log(`Exported ${baseName}.svg and ${baseName}.png`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});