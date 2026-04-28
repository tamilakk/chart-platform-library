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

  it("creates a scatter chart option", () => {
    const chart: ChartDefinition = {
      type: "scatter",
      title: "Scatter",
      series: [
        {
          id: "points",
          label: "Points",
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 4 }
          ]
        }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("scatter");
  });

  it("creates a radar chart option", () => {
    const chart: ChartDefinition = {
      type: "radar",
      title: "Radar",
      indicators: [
        { label: "A", max: 100 },
        { label: "B", max: 100 }
      ],
      series: [
        {
          id: "score",
          label: "Score",
          data: [80, 90]
        }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("radar");
  });

  it("creates a gauge chart option", () => {
    const chart: ChartDefinition = {
      type: "gauge",
      title: "Gauge",
      label: "Score",
      value: 75,
      min: 0,
      max: 100
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("gauge");
  });

  it("creates a funnel chart option", () => {
    const chart: ChartDefinition = {
      type: "funnel",
      title: "Funnel",
      data: [
        { label: "Visits", value: 100 },
        { label: "Orders", value: 30 }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("funnel");
  });

  it("returns raw ECharts option", () => {
    const chart: ChartDefinition = {
      type: "echarts",
      title: "Raw",
      option: {
        xAxis: { type: "category", data: ["A", "B"] },
        yAxis: { type: "value" },
        series: [
          {
            type: "bar",
            data: [1, 2]
          }
        ]
      }
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("bar");
  });
});