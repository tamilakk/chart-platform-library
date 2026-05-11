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

  // TS-2: static export preserves requested dimensions in SVG attributes
  it("SVG output contains the requested width and height", async () => {
    const svg = await renderToSVG(demoCharts.monthlySalesBar, {
      width: 1200,
      height: 600,
      background: "#ffffff"
    });

    expect(svg).toMatch(/width="1200"/);
    expect(svg).toMatch(/height="600"/);
  });

  // TS-3: multi-series chart renders without errors on both channels
  it("renders multi-series bar chart to SVG", async () => {
    const svg = await renderToSVG(demoCharts.revenueVsCostsBar, exportOptions);

    expect(svg.trim().startsWith("<svg")).toBe(true);
    expect(svg.length).toBeGreaterThan(100);
  });

  it("renders multi-series line chart to SVG", async () => {
    const svg = await renderToSVG(demoCharts.trafficSourcesLine, exportOptions);

    expect(svg.trim().startsWith("<svg")).toBe(true);
    expect(svg.length).toBeGreaterThan(100);
  });

  // TS-4: long category labels do not cause errors
  it("handles long category labels without throwing", async () => {
    const chartWithLongLabels: ChartDefinition = {
      type: "bar",
      title: "Long Labels",
      labels: [
        "January 2024 — first quarter",
        "February 2024 — first quarter",
        "March 2024 — end of first quarter"
      ],
      series: [{ id: "s", label: "Sales", data: [100, 200, 150] }]
    };

    const svg = await renderToSVG(chartWithLongLabels, exportOptions);

    expect(svg.trim().startsWith("<svg")).toBe(true);
  });

  // TS-7: large dataset does not cause errors
  it("handles a large dataset (500 points) without failing", async () => {
    const labels = Array.from({ length: 500 }, (_, i) => `Day ${i + 1}`);
    const data = Array.from({ length: 500 }, () =>
      Math.floor(Math.random() * 1000)
    );

    const largeChart: ChartDefinition = {
      type: "line",
      title: "Large Dataset",
      labels,
      series: [{ id: "values", label: "Values", data }]
    };

    const svg = await renderToSVG(largeChart, exportOptions);
    const png = await renderToPNG(largeChart, exportOptions);

    expect(svg.trim().startsWith("<svg")).toBe(true);
    expect(Buffer.isBuffer(png)).toBe(true);
    expectPngSignature(png);
  });

  // TS-8: reproducibility — two exports of the same chart produce structurally
  // identical SVG. ECharts appends an internal render counter to CSS class names
  // (e.g. zr29-cls-5), so we normalise those before comparing.
  it("produces structurally identical SVG on repeated exports (reproducibility)", async () => {
    const normalise = (svg: string) =>
      svg
        .replace(/zr\d+-cls-\d+/g, "zr-cls-N")
        .replace(/zr\d+-ani-\d+/g, "zr-ani");

    const svg1 = await renderToSVG(demoCharts.deviceSharePie, exportOptions);
    const svg2 = await renderToSVG(demoCharts.deviceSharePie, exportOptions);

    expect(normalise(svg1)).toBe(normalise(svg2));
  });
});