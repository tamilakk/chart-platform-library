import { describe, expect, it } from "vitest";
import {
  validateChartDefinition,
  validateExportOptions
} from "./validation";
import {
  monthlySalesBar,
  deviceSharePie
} from "./examples";

describe("validateChartDefinition", () => {
  it("accepts a valid bar chart definition", () => {
    expect(() => validateChartDefinition(monthlySalesBar)).not.toThrow();
  });

  it("throws when series length does not match labels length", () => {
    expect(() =>
      validateChartDefinition({
        type: "bar",
        title: "Invalid chart",
        labels: ["Jan", "Feb", "Mar"],
        series: [
          {
            id: "sales",
            label: "Sales",
            data: [10, 20]
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
        title: "Empty pie",
        data: []
      })
    ).toThrow(/pie chart requires at least one data item/i);
  });

  it("throws when series id is empty", () => {
    expect(() =>
      validateChartDefinition({
        type: "line",
        title: "Invalid series id",
        labels: ["Jan", "Feb"],
        series: [
          {
            id: "",
            label: "Users",
            data: [10, 20]
          }
        ]
      })
    ).toThrow(/must have a non-empty id/i);
  });

  it("throws when labels contain an empty string", () => {
    expect(() =>
      validateChartDefinition({
        type: "bar",
        title: "Invalid labels",
        labels: ["Jan", ""],
        series: [
          {
            id: "sales",
            label: "Sales",
            data: [10, 20]
          }
        ]
      })
    ).toThrow(/label at index 1 must be a non-empty string/i);
  });

  it("throws when series contains a non-finite value", () => {
    expect(() =>
      validateChartDefinition({
        type: "line",
        title: "Invalid numeric data",
        labels: ["Jan", "Feb"],
        series: [
          {
            id: "users",
            label: "Users",
            data: [10, Number.NaN]
          }
        ]
      })
    ).toThrow(/non-finite value/i);
  });

  it("throws when pie chart contains a negative value", () => {
    expect(() =>
      validateChartDefinition({
        type: "pie",
        title: "Invalid pie",
        data: [
          { label: "Desktop", value: 48 },
          { label: "Mobile", value: -5 }
        ]
      })
    ).toThrow(/must not have a negative value/i);
  });

  it("accepts a valid pie chart definition", () => {
    expect(() => validateChartDefinition(deviceSharePie)).not.toThrow();
  });
});