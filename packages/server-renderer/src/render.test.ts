import { describe, expect, it } from "vitest";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { renderToPNG } from "./renderToPNG";
import { renderToSVG } from "./renderToSVG";

const chart: ChartDefinition = {
  type: "bar",
  title: "Monthly Sales",
  labels: ["Jan", "Feb", "Mar"],
  series: [
    {
      id: "sales",
      label: "Sales",
      data: [12, 19, 9]
    }
  ]
};

const exportOptions: ExportOptions = {
  width: 800,
  height: 400,
  background: "#ffffff"
};

describe("server renderer", () => {
  it("renders svg output", async () => {
    const svg = await renderToSVG(chart, exportOptions);

    expect(svg.startsWith("<svg")).toBe(true);
  });

  it("renders png output", async () => {
    const png = await renderToPNG(chart, exportOptions);

    expect(Buffer.isBuffer(png)).toBe(true);
    expect(png.length).toBeGreaterThan(0);
  });
});