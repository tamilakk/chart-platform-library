import { describe, expect, it } from "vitest";
import type { ChartDefinition } from "@chart-platform/core";
import { demoCharts } from "@chart-platform/test-fixtures";
import { ChartServerImage } from "./ChartServerImage";

describe("ChartServerImage", () => {
  it("returns a React element with role='img'", async () => {
    const element = await ChartServerImage({ definition: demoCharts.monthlySalesBar });

    expect(element.props.role).toBe("img");
  });

  it("sets aria-label from the chart title by default", async () => {
    const element = await ChartServerImage({ definition: demoCharts.monthlySalesBar });

    expect(element.props["aria-label"]).toBe(demoCharts.monthlySalesBar.title);
  });

  it("uses an explicit aria-label when provided", async () => {
    const element = await ChartServerImage({
      definition: demoCharts.monthlySalesBar,
      "aria-label": "Custom label"
    });

    expect(element.props["aria-label"]).toBe("Custom label");
  });

  it("inlines an SVG string via dangerouslySetInnerHTML", async () => {
    const element = await ChartServerImage({ definition: demoCharts.monthlySalesBar });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    expect(html.trim().startsWith("<svg")).toBe(true);
    expect(html.length).toBeGreaterThan(100);
  });

  it("applies default width (800) and height (400) to the export", async () => {
    const element = await ChartServerImage({ definition: demoCharts.monthlySalesBar });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    expect(html).toMatch(/width="800"/);
    expect(html).toMatch(/height="400"/);
  });

  it("applies custom width and height", async () => {
    const element = await ChartServerImage({
      definition: demoCharts.monthlySalesBar,
      width: 1200,
      height: 600
    });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    expect(html).toMatch(/width="1200"/);
    expect(html).toMatch(/height="600"/);
    expect(element.props.style.maxWidth).toBe(1200);
  });

  it("passes a background colour through to the SVG", async () => {
    const element = await ChartServerImage({
      definition: demoCharts.monthlySalesBar,
      background: "#ff0000"
    });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    // ECharts embeds the background colour inside the SVG markup
    expect(html).toContain("ff0000");
  });

  it("renders with a built-in dark theme", async () => {
    const element = await ChartServerImage({
      definition: demoCharts.monthlySalesBar,
      theme: "dark"
    });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    expect(html.trim().startsWith("<svg")).toBe(true);
    expect(html.length).toBeGreaterThan(100);
  });

  it("renders with a custom theme object", async () => {
    const element = await ChartServerImage({
      definition: demoCharts.userGrowthLine,
      theme: { colors: ["#7c3aed"], backgroundColor: "#faf5ff", textColor: "#4c1d95" }
    });
    const html: string = element.props.dangerouslySetInnerHTML.__html;

    expect(html.trim().startsWith("<svg")).toBe(true);
  });

  it("renders every demo chart without throwing", async () => {
    for (const [name, definition] of Object.entries(demoCharts)) {
      await expect(
        ChartServerImage({ definition })
      ).resolves.toBeDefined();
      void name;
    }
  });

  it("propagates validation errors from an invalid definition", async () => {
    const invalid = {
      type: "bar",
      title: "Bad",
      labels: ["A", "B"],
      series: [{ id: "s", label: "S", data: [1] }]
    } as unknown as ChartDefinition;

    await expect(ChartServerImage({ definition: invalid })).rejects.toThrow(
      /data length must match labels length/i
    );
  });
});
