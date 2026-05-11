/// <reference types="vitest" />
// @vitest-environment jsdom

import type React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { ChartDefinition } from "@chart-platform/core";
import { monthlySalesBar } from "@chart-platform/core";
import { afterEach, describe, expect, it, vi } from "vitest";
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