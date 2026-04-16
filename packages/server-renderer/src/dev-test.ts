import {
  demoCharts,
  type ExportOptions
} from "@chart-platform/core";
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

async function main() {
  for (const [key, chart] of Object.entries(demoCharts)) {
    const svg = await renderToSVG(chart, exportOptions);
    const png = await renderToPNG(chart, exportOptions);
    const svgBase64 = await renderToSVGBase64(chart, exportOptions);
    const pngBase64 = await renderToPNGBase64(chart, exportOptions);

    console.log(`=== ${key} ===`);
    console.log(`SVG type: ${typeof svg}, length: ${svg.length}`);
    console.log(`PNG is Buffer: ${Buffer.isBuffer(png)}, bytes: ${png.length}`);
    console.log(`SVG base64 length: ${svgBase64.length}`);
    console.log(`PNG base64 length: ${pngBase64.length}`);
    console.log(`SVG preview: ${svg.slice(0, 80)}...`);
    console.log(`PNG base64 preview: ${pngBase64.slice(0, 80)}...`);
    console.log("");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});