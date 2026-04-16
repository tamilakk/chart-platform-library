import { demoCharts, type ExportOptions } from "@chart-platform/core";
import {
  renderToPNG,
  renderToPNGBase64,
  renderToSVG,
  renderToSVGBase64
} from "./index";

const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

function formatBytes(bytes: number): string {
  return `${bytes} B`;
}

async function main() {
  console.log("Backend rendering demo");
  console.log("======================");
  console.log("");

  for (const [key, chart] of Object.entries(demoCharts)) {
    const svg = await renderToSVG(chart, exportOptions);
    const png = await renderToPNG(chart, exportOptions);
    const svgBase64 = await renderToSVGBase64(chart, exportOptions);
    const pngBase64 = await renderToPNGBase64(chart, exportOptions);

    console.log(`Chart: ${key}`);
    console.log(`Title: ${chart.title}`);
    console.log(`SVG output: string, length ${svg.length}`);
    console.log(`PNG output: Buffer, size ${formatBytes(png.length)}`);
    console.log(`SVG base64 length: ${svgBase64.length}`);
    console.log(`PNG base64 length: ${pngBase64.length}`);
    console.log(`SVG preview: ${svg.slice(0, 100)}...`);
    console.log(`PNG base64 preview: ${pngBase64.slice(0, 100)}...`);
    console.log("");
  }

  console.log("Backend demo completed successfully.");
}

main().catch((error) => {
  console.error("Backend demo failed.");
  console.error(error);
  process.exit(1);
});