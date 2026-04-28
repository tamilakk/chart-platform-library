import { describe, expect, it } from "vitest";
import {
  validateChartDefinition,
  validateExportOptions
} from "./validation";
import {
  deviceSharePie,
  monthlySalesBar
} from "./examples";
import { ChartDefinition } from "./types";

describe("validateChartDefinition", () => {
  it("accepts a valid bar chart definition", () => {
    expect(() => validateChartDefinition(monthlySalesBar)).not.toThrow();
  });

  it("accepts a valid pie chart definition", () => {
    expect(() => validateChartDefinition(deviceSharePie)).not.toThrow();
  });

  it("throws when series length does not match labels length", () => {
    expect(() =>
      validateChartDefinition({
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
      })
    ).toThrow(/data length must match labels length/i);
  });

  it("throws when export height is invalid", () => {
    expect(() =>
      validateExportOptions({
        width: 800,
        height: 0,
        background: "#ffffff"
      })
    ).toThrow(/height.*positive integer/i);
  });

  it("throws when pie chart has no data", () => {
    expect(() =>
      validateChartDefinition({
        type: "pie",
        title: "Empty Pie",
        data: []
      })
    ).toThrow(/requires at least one data item/i);
  });

  it("throws when series id is empty", () => {
    expect(() =>
      validateChartDefinition({
        type: "line",
        title: "Invalid Series Id",
        labels: ["Jan", "Feb"],
        series: [
          {
            id: "",
            label: "Users",
            data: [120, 180]
          }
        ]
      })
    ).toThrow(/non-empty id/i);
  });

  it("throws when label is empty", () => {
    expect(() =>
      validateChartDefinition({
        type: "bar",
        title: "Invalid Labels",
        labels: ["Jan", ""],
        series: [
          {
            id: "sales",
            label: "Sales",
            data: [12, 19]
          }
        ]
      })
    ).toThrow(/label at index 1 must be a non-empty string/i);
  });

  it("throws when series contains NaN", () => {
    expect(() =>
      validateChartDefinition({
        type: "line",
        title: "NaN Data",
        labels: ["Jan", "Feb"],
        series: [
          {
            id: "users",
            label: "Users",
            data: [120, Number.NaN]
          }
        ]
      })
    ).toThrow(/non-finite value/i);
  });

  it("throws when series contains Infinity", () => {
    expect(() =>
      validateChartDefinition({
        type: "line",
        title: "Infinite Data",
        labels: ["Jan", "Feb"],
        series: [
          {
            id: "users",
            label: "Users",
            data: [120, Number.POSITIVE_INFINITY]
          }
        ]
      })
    ).toThrow(/non-finite value/i);
  });

  it("throws when pie chart contains a negative value", () => {
    expect(() =>
      validateChartDefinition({
        type: "pie",
        title: "Invalid Pie",
        data: [
          { label: "Desktop", value: 48 },
          { label: "Mobile", value: -5 }
        ]
      })
    ).toThrow(/must not have a negative value/i);
  });

  it("throws when pie chart contains a non-finite value", () => {
    expect(() =>
      validateChartDefinition({
        type: "pie",
        title: "Invalid Pie",
        data: [
          { label: "Desktop", value: 48 },
          { label: "Mobile", value: Number.NaN }
        ]
      })
    ).toThrow(/finite numeric value/i);
  });
});

describe("validateExportOptions", () => {
  it("accepts valid export options", () => {
    expect(() =>
      validateExportOptions({
        width: 800,
        height: 400,
        background: "#ffffff"
      })
    ).not.toThrow();
  });

  it("throws when export width is invalid", () => {
    expect(() =>
      validateExportOptions({
        width: 0,
        height: 400,
        background: "#ffffff"
      })
    ).toThrow(/width.*positive integer/i);
  });

  it("throws when background is empty", () => {
    expect(() =>
      validateExportOptions({
        width: 800,
        height: 400,
        background: ""
      })
    ).toThrow(/background must be a non-empty string/i);
  });

    it("accepts a valid scatter chart definition", () => {
    expect(() =>
      validateChartDefinition({
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
      })
    ).not.toThrow();
  });

  it("throws when scatter point contains non-finite value", () => {
    expect(() =>
      validateChartDefinition({
        type: "scatter",
        title: "Invalid Scatter",
        series: [
          {
            id: "points",
            label: "Points",
            data: [
              { x: 1, y: Number.NaN }
            ]
          }
        ]
      })
    ).toThrow(/non-finite point/i);
  });

  it("accepts a valid radar chart definition", () => {
    expect(() =>
      validateChartDefinition({
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
      })
    ).not.toThrow();
  });

  it("throws when radar data length does not match indicators length", () => {
    expect(() =>
      validateChartDefinition({
        type: "radar",
        title: "Invalid Radar",
        indicators: [
          { label: "A", max: 100 },
          { label: "B", max: 100 }
        ],
        series: [
          {
            id: "score",
            label: "Score",
            data: [80]
          }
        ]
      })
    ).toThrow(/data length must match indicators length/i);
  });

  it("accepts a valid gauge chart definition", () => {
    expect(() =>
      validateChartDefinition({
        type: "gauge",
        title: "Gauge",
        label: "Score",
        value: 75,
        min: 0,
        max: 100
      })
    ).not.toThrow();
  });

  it("throws when gauge value is outside range", () => {
    expect(() =>
      validateChartDefinition({
        type: "gauge",
        title: "Invalid Gauge",
        label: "Score",
        value: 120,
        min: 0,
        max: 100
      })
    ).toThrow(/within min and max range/i);
  });

  it("accepts a valid funnel chart definition", () => {
    expect(() =>
      validateChartDefinition({
        type: "funnel",
        title: "Funnel",
        data: [
          { label: "Visits", value: 100 },
          { label: "Orders", value: 30 }
        ]
      })
    ).not.toThrow();
  });

  it("accepts a raw ECharts definition", () => {
    expect(() =>
      validateChartDefinition({
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
      })
    ).not.toThrow();
  });

    it("throws when chart definition is not an object", () => {
    expect(() =>
      validateChartDefinition(null as unknown as ChartDefinition)
    ).toThrow(/valid object/i);
  });

  it("throws for unsupported chart type", () => {
    expect(() =>
      validateChartDefinition({
        type: "unknown"
      } as unknown as ChartDefinition)
    ).toThrow(/unsupported chart type/i);
  });

  it("throws when cartesian label is empty", () => {
    expect(() =>
      validateChartDefinition({
        type: "bar",
        labels: ["Jan", ""],
        series: [
          {
            id: "sales",
            label: "Sales",
            data: [10, 20]
          }
        ]
      })
    ).toThrow(/label at index/i);
  });

  it("throws when pie value is negative", () => {
    expect(() =>
      validateChartDefinition({
        type: "pie",
        title: "Invalid Pie",
        data: [
          {
            label: "Desktop",
            value: -10
          }
        ]
      })
    ).toThrow(/must not have a negative value/i);
  });

  it("throws when funnel value is non-finite", () => {
    expect(() =>
      validateChartDefinition({
        type: "funnel",
        title: "Invalid Funnel",
        data: [
          {
            label: "Visits",
            value: Number.POSITIVE_INFINITY
          }
        ]
      })
    ).toThrow(/finite numeric value/i);
  });

  it("throws when raw ECharts option is not an object", () => {
    expect(() =>
      validateChartDefinition({
        type: "echarts",
        title: "Invalid Raw",
        option: null
      } as unknown as ChartDefinition)
    ).toThrow(/valid option object/i);
  });
  
});