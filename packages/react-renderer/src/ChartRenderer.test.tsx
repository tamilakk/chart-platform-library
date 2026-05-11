/// <reference types="vitest" />
// @vitest-environment jsdom

import type React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { ChartDefinition } from "@chart-platform/core";
import { monthlySalesBar } from "@chart-platform/core";
import { afterEach, describe, expect, it, vi, beforeEach } from "vitest";
import * as core from "@chart-platform/core";
import { ChartRenderer } from "./ChartRenderer";

vi.mock("echarts-for-react", () => ({
  default: ({
    option,
    style
  }: {
    option: Record<string, unknown>;
    style?: React.CSSProperties;
  }) => (
    <div
      data-testid="echarts-mock"
      data-option={JSON.stringify(option)}
      style={style}
    />
  )
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("ChartRenderer", () => {
  it("renders ECharts component from a shared chart definition", () => {
    render(<ChartRenderer definition={monthlySalesBar} height={360} />);

    const chart = screen.getByTestId("echarts-mock");

    expect(chart).toBeInTheDocument();
    expect(chart.getAttribute("style")).toContain("height: 360px");
  });

  // TS-6: responsive — component stretches to container width
  it("uses 100% width for responsive layout", () => {
    render(<ChartRenderer definition={monthlySalesBar} />);

    const chart = screen.getByTestId("echarts-mock");

    expect(chart.getAttribute("style")).toContain("width: 100%");
  });

  it("passes transformed ECharts option to the renderer", () => {
    render(<ChartRenderer definition={monthlySalesBar} height={360} />);

    const chart = screen.getByTestId("echarts-mock");
    const option = JSON.parse(chart.dataset.option ?? "{}");

    expect(option.series[0].type).toBe("bar");
    expect(option.title.text).toBe("Monthly Sales");
  });

  it("shows a string error when a non-Error value is thrown during validation", () => {
    vi.spyOn(core, "validateChartDefinition").mockImplementation(() => {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw "string error";
    });

    render(<ChartRenderer definition={monthlySalesBar} height={360} />);

    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toContain("string error");
  });

  // TS-10: accessibility — chart is exposed as an image with a label
  it("uses chart title as aria-label by default", () => {
    render(<ChartRenderer definition={monthlySalesBar} />);

    expect(screen.getByRole("img", { name: "Monthly Sales" })).toBeInTheDocument();
  });

  it("uses the aria-label prop when provided", () => {
    render(<ChartRenderer definition={monthlySalesBar} aria-label="Sales chart for Q1" />);

    expect(screen.getByRole("img", { name: "Sales chart for Q1" })).toBeInTheDocument();
  });

  it("shows an error message for invalid chart definitions instead of crashing", () => {
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

    render(<ChartRenderer definition={invalidChart} height={360} />);

    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert.textContent).toMatch(/data length must match labels length/i);
  });
});