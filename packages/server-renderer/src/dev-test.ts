import { renderToPNG, renderToSVG } from "./index";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { writeFile } from "node:fs/promises";

const chart: ChartDefinition = {
  type: "bar",
  title: "Monthly Sales",
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  series: [
    {
      id: "sales",
      label: "Sales",
      data: [12, 19, 9, 25, 17]
    }
  ]
};

const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

async function main() {
  const svg = await renderToSVG(chart, exportOptions);
  const png = await renderToPNG(chart, exportOptions);

  await writeFile("packages/server-renderer/example.svg", svg, "utf-8");
  await writeFile("packages/server-renderer/example.png", png);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});