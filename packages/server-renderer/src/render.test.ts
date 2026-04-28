import { describe, expect, it } from "vitest";
import type { ChartDefinition, ExportOptions } from "@chart-platform/core";
import { demoCharts } from "@chart-platform/core";
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

function expectPngSignature(buffer: Buffer): void {
  expect(buffer.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
}

describe("server renderer", () => {
  it.each(Object.entries(demoCharts))(
    "renders SVG output for %s",
    async (_name, definition) => {
      const svg = await renderToSVG(definition, exportOptions);

      expect(svg.trim().startsWith("<svg")).toBe(true);
      expect(svg.length).toBeGreaterThan(100);
    }
  );

  it.each(Object.entries(demoCharts))(
    "renders PNG output for %s",
    async (_name, definition) => {
      const png = await renderToPNG(definition, exportOptions);

      expect(Buffer.isBuffer(png)).toBe(true);
      expect(png.length).toBeGreaterThan(100);
      expectPngSignature(png);
    }
  );

  it("renders SVG base64 output", async () => {
    const svgBase64 = await renderToSVGBase64(
      demoCharts.monthlySalesBar,
      exportOptions
    );

    const decodedSvg = Buffer.from(svgBase64, "base64").toString("utf-8");

    expect(typeof svgBase64).toBe("string");
    expect(svgBase64.length).toBeGreaterThan(0);
    expect(decodedSvg.trim().startsWith("<svg")).toBe(true);
  });

  it("renders PNG base64 output", async () => {
    const pngBase64 = await renderToPNGBase64(
      demoCharts.monthlySalesBar,
      exportOptions
    );

    const decodedPng = Buffer.from(pngBase64, "base64");

    expect(typeof pngBase64).toBe("string");
    expect(pngBase64.length).toBeGreaterThan(0);
    expect(Buffer.isBuffer(decodedPng)).toBe(true);
    expect(decodedPng.length).toBeGreaterThan(100);
    expectPngSignature(decodedPng);
  });

  it("rejects invalid chart definitions", async () => {
    const invalidChart = {
      type: "bar",
      title: "Invalid",
      labels: ["Jan", "Feb"],
      series: [
        {
          id: "sales",
          label: "Sales",
          data: [10]
        }
      ]
    } as unknown as ChartDefinition;

    await expect(renderToSVG(invalidChart, exportOptions)).rejects.toThrow(
      /data length must match labels length/i
    );
  });

  it("rejects invalid export options", async () => {
    await expect(
      renderToSVG(demoCharts.monthlySalesBar, {
        width: 0,
        height: 400,
        background: "#ffffff"
      })
    ).rejects.toThrow(/export width/i);
  });
});