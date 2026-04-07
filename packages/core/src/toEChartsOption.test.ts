import { describe, expect, it } from "vitest";
import type { ChartDefinition } from "./types";
import { toEChartsOption } from "./adapters/toEChartsOption";

describe("toEChartsOption", () => {
  it("creates a bar chart option", () => {
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

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("bar");
  });

  it("creates a line chart option", () => {
    const chart: ChartDefinition = {
      type: "line",
      title: "User Growth",
      labels: ["Jan", "Feb", "Mar"],
      series: [
        {
          id: "users",
          label: "Users",
          data: [120, 180, 260]
        }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("line");
  });

  it("creates a pie chart option", () => {
    const chart: ChartDefinition = {
      type: "pie",
      title: "Device Share",
      data: [
        { label: "Desktop", value: 48 },
        { label: "Mobile", value: 38 }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("pie");
  });
});