import { describe, expect, it } from "vitest";
import { toEChartsOption, validateChartDefinition } from "./index";
import { demoCharts } from "./__fixtures__/charts";

describe("demo chart definitions", () => {
  it.each(Object.entries(demoCharts))(
    "validates demo chart definition: %s",
    (_name, definition) => {
      expect(() => validateChartDefinition(definition)).not.toThrow();
    }
  );

  it.each(Object.entries(demoCharts))(
    "converts demo chart definition to ECharts option: %s",
    (_name, definition) => {
      const option = toEChartsOption(definition);

      expect(option).toBeDefined();
      expect(typeof option).toBe("object");
    }
  );
});