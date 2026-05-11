import { describe, expect, it } from "vitest";
import type { ChartDefinition } from "./types";
import { toEChartsOption } from "./adapters/toEChartsOption";

describe("toEChartsOption", () => {
  it("creates a bar chart option with correct series type, title, axis labels and data", () => {
    const chart: ChartDefinition = {
      type: "bar",
      title: "Monthly Sales",
      labels: ["Jan", "Feb", "Mar"],
      xAxisLabel: "Month",
      yAxisLabel: "Units",
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
    const xAxis = option.xAxis as Record<string, unknown>;
    const yAxis = option.yAxis as Record<string, unknown>;
    const title = option.title as Record<string, unknown>;

    expect(series[0].type).toBe("bar");
    expect(series[0].name).toBe("Sales");
    expect(series[0].data).toEqual([12, 19, 9]);
    expect(title.text).toBe("Monthly Sales");
    expect(xAxis.data).toEqual(["Jan", "Feb", "Mar"]);
    expect(xAxis.name).toBe("Month");
    expect(yAxis.name).toBe("Units");
  });

  it("creates a bar chart with legend for multiple series", () => {
    const chart: ChartDefinition = {
      type: "bar",
      title: "Revenue vs Costs",
      labels: ["Q1", "Q2"],
      series: [
        { id: "revenue", label: "Revenue", data: [120, 150] },
        { id: "costs", label: "Costs", data: [80, 95] }
      ]
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;

    expect(option.legend).toBeDefined();
  });

  it("creates a line chart option with smooth flag and correct data", () => {
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
    expect(series[0].smooth).toBe(false);
    expect(series[0].data).toEqual([120, 180, 260]);
  });

  it("creates a pie chart option with mapped data items", () => {
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
    const data = series[0].data as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("pie");
    expect(data).toHaveLength(2);
    expect(data[0]).toEqual({ name: "Desktop", value: 48 });
    expect(data[1]).toEqual({ name: "Mobile", value: 38 });
  });

  it("creates a scatter chart option with [x, y] point format", () => {
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
    const data = series[0].data as Array<unknown>;

    expect(series[0].type).toBe("scatter");
    expect(data[0]).toEqual([1, 2]);
    expect(data[1]).toEqual([2, 4]);
  });

  it("creates a radar chart option with indicators and series data", () => {
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
    const radar = option.radar as Record<string, unknown>;
    const indicators = radar.indicator as Array<Record<string, unknown>>;
    const seriesData = series[0].data as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("radar");
    expect(indicators).toHaveLength(2);
    expect(indicators[0]).toEqual({ name: "A", max: 100 });
    expect(seriesData[0].value).toEqual([80, 90]);
  });

  it("creates a gauge chart option with correct min, max and value", () => {
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
    const data = series[0].data as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("gauge");
    expect(series[0].min).toBe(0);
    expect(series[0].max).toBe(100);
    expect(data[0].value).toBe(75);
    expect(data[0].name).toBe("Score");
  });

  it("uses default min=0 and max=100 for gauge when not specified", () => {
    const chart: ChartDefinition = {
      type: "gauge",
      title: "Gauge",
      label: "Score",
      value: 50
    };

    const option = toEChartsOption(chart) as Record<string, unknown>;
    const series = option.series as Array<Record<string, unknown>>;

    expect(series[0].min).toBe(0);
    expect(series[0].max).toBe(100);
  });

  it("creates a funnel chart option with mapped data and descending sort", () => {
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
    const data = series[0].data as Array<Record<string, unknown>>;

    expect(series[0].type).toBe("funnel");
    expect(series[0].sort).toBe("descending");
    expect(data[0]).toEqual({ name: "Visits", value: 100 });
    expect(data[1]).toEqual({ name: "Orders", value: 30 });
  });

  it("throws for an unsupported chart type", () => {
    const unknown = { type: "heatmap", title: "X" } as unknown as ChartDefinition;

    expect(() => toEChartsOption(unknown)).toThrow(/unsupported chart type/i);
  });

  it("returns raw ECharts option unchanged", () => {
    const rawOption = {
      xAxis: { type: "category", data: ["A", "B"] },
      yAxis: { type: "value" },
      series: [{ type: "bar", data: [1, 2] }]
    };

    const chart: ChartDefinition = {
      type: "echarts",
      title: "Raw",
      option: rawOption
    };

    const option = toEChartsOption(chart);

    expect(option).toBe(rawOption);
  });
});