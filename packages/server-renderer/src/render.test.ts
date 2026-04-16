import { describe, expect, it } from "vitest";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import {
  renderToPNG,
  renderToPNGBase64,
  renderToSVG,
  renderToSVGBase64
} from "./index";

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
    expect(svg.length).toBeGreaterThan(0);
  });

  it("renders png output", async () => {
    const png = await renderToPNG(chart, exportOptions);

    expect(Buffer.isBuffer(png)).toBe(true);
    expect(png.length).toBeGreaterThan(0);
  });

  it("renders svg base64 output", async () => {
    const svgBase64 = await renderToSVGBase64(chart, exportOptions);
    const decodedSvg = Buffer.from(svgBase64, "base64").toString("utf-8");

    expect(typeof svgBase64).toBe("string");
    expect(svgBase64.length).toBeGreaterThan(0);
    expect(decodedSvg.startsWith("<svg")).toBe(true);
  });

  it("renders png base64 output", async () => {
    const pngBase64 = await renderToPNGBase64(chart, exportOptions);
    const decodedPng = Buffer.from(pngBase64, "base64");

    expect(typeof pngBase64).toBe("string");
    expect(pngBase64.length).toBeGreaterThan(0);
    expect(Buffer.isBuffer(decodedPng)).toBe(true);
    expect(decodedPng.length).toBeGreaterThan(0);
  });
});