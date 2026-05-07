import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  conversionFunnel,
  demoCharts,
  type ChartDefinition,
  type ExportOptions
} from "@chart-platform/core";
import { renderToPNG } from "./renderToPNG";
import { renderToPNGBase64 } from "./renderToPNGBase64";
import { renderToSVG } from "./renderToSVG";
import { renderToSVGBase64 } from "./renderToSVGBase64";

// Shared export settings used in the demo.
const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

// Output directory for generated demo files.
const outputDir = path.resolve(process.cwd(), "generated-output");

/**
 * Renders one chart to all supported output formats.
 *
 * @param name File name prefix for generated outputs.
 * @param chart Chart definition to render.
 */
async function renderChart(name: string, chart: ChartDefinition) {
  const svg = await renderToSVG(chart, exportOptions);
  const png = await renderToPNG(chart, exportOptions);
  const svgBase64 = await renderToSVGBase64(chart, exportOptions);
  const pngBase64 = await renderToPNGBase64(chart, exportOptions);

  await writeFile(path.join(outputDir, `${name}.svg`), svg, "utf8");
  await writeFile(path.join(outputDir, `${name}.png`), png);
  await writeFile(
    path.join(outputDir, `${name}.svg.base64.txt`),
    svgBase64,
    "utf8"
  );
  await writeFile(
    path.join(outputDir, `${name}.png.base64.txt`),
    pngBase64,
    "utf8"
  );

  console.log(`Chart: ${name}`);
  console.log(`Title: ${chart.title ?? "(no title)"}`);
  console.log(`SVG output: string, length ${svg.length}`);
  console.log(`PNG output: Buffer, size ${png.length} B`);
  console.log(`SVG base64 length: ${svgBase64.length}`);
  console.log(`PNG base64 length: ${pngBase64.length}`);
  console.log(`SVG preview: ${svg.slice(0, 120)}...`);
  console.log(`PNG base64 preview: ${pngBase64.slice(0, 120)}...`);
  console.log(`Saved files:`);
  console.log(`  - generated-output/${name}.svg`);
  console.log(`  - generated-output/${name}.png`);
  console.log(`  - generated-output/${name}.svg.base64.txt`);
  console.log(`  - generated-output/${name}.png.base64.txt`);
  console.log("");
}

/**
 * Runs the backend demo for all example charts.
 */
async function main() {
  await mkdir(outputDir, { recursive: true });

  console.log("Backend rendering demo");
  console.log("======================");
  console.log("");

  for (const [name, chart] of Object.entries(demoCharts)) {
    await renderChart(name, chart);
  }

  console.log("Backend demo completed successfully.");
}

/**
 * Handles unexpected demo errors.
 *
 * @param error Caught error from the demo run.
 */
main().catch((error) => {
  console.error("Backend demo failed.");
  console.error(error);
  process.exit(1);
});