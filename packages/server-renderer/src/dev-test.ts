import {
  demoCharts,
  type ExportOptions
} from "@chart-platform/core";
import {
  renderToPNGBase64,
  renderToSVGBase64
} from "./index";

const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

async function main() {
  for (const [key, chart] of Object.entries(demoCharts)) {
    const svgBase64 = await renderToSVGBase64(chart, exportOptions);
    const pngBase64 = await renderToPNGBase64(chart, exportOptions);

    console.log(`=== ${key} ===`);
    console.log(`SVG base64 length: ${svgBase64.length}`);
    console.log(`PNG base64 length: ${pngBase64.length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});