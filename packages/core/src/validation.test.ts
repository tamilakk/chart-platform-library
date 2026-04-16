import { describe, expect, it } from "vitest";
import {
  validateChartDefinition,
  validateExportOptions
} from "./validation";
import {
  deviceSharePie,
  monthlySalesBar
} from "./examples";

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
});