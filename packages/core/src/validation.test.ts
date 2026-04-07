import { describe, expect, it } from "vitest";
import type { ChartDefinition } from "./types";
import { validateChartDefinition } from "./validation";

describe("validateChartDefinition", () => {
  it("accepts a valid bar chart definition", () => {
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

    expect(() => validateChartDefinition(chart)).not.toThrow();
  });

  it("throws when series length does not match labels length", () => {
    const chart: ChartDefinition = {
      type: "bar",
      title: "Broken Chart",
      labels: ["Jan", "Feb", "Mar"],
      series: [
        {
          id: "broken",
          label: "Broken",
          data: [12, 19]
        }
      ]
    };

    expect(() => validateChartDefinition(chart)).toThrow(
      /data length must match labels length/i
    );
  });

  it("throws when pie chart has no data", () => {
    const chart: ChartDefinition = {
      type: "pie",
      title: "Empty Pie",
      data: []
    };

    expect(() => validateChartDefinition(chart)).toThrow(
      /requires at least one data item/i
    );
  });
});