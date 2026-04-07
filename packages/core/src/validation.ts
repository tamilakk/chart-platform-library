import type {
  ChartDefinition,
  CartesianChartDefinition,
  PieChartDefinition
} from "./types";
import type { ExportOptions } from "./export-options";

function validateCartesianChart(definition: CartesianChartDefinition): void {
  if (!definition.labels || definition.labels.length === 0) {
    throw new Error("Bar and line charts require at least one label.");
  }

  if (!definition.series || definition.series.length === 0) {
    throw new Error("Bar and line charts require at least one series.");
  }

  for (const series of definition.series) {
    if (!series.label || series.label.trim().length === 0) {
      throw new Error("Each series must have a non-empty label.");
    }

    if (!series.data || series.data.length === 0) {
      throw new Error(`Series "${series.label}" must contain at least one data point.`);
    }

    if (series.data.length !== definition.labels.length) {
      throw new Error(
        `Series "${series.label}" data length must match labels length.`
      );
    }
  }
}

function validatePieChart(definition: PieChartDefinition): void {
  if (!definition.data || definition.data.length === 0) {
    throw new Error("Pie chart requires at least one data item.");
  }

  for (const item of definition.data) {
    if (!item.label || item.label.trim().length === 0) {
      throw new Error("Each pie chart item must have a non-empty label.");
    }
  }
}

export function validateChartDefinition(definition: ChartDefinition): void {
  switch (definition.type) {
    case "bar":
    case "line":
      validateCartesianChart(definition);
      return;
    case "pie":
      validatePieChart(definition);
      return;
    default:
      throw new Error(
        `Unsupported chart type: ${(definition as { type?: string }).type}`
      );
  }
}

export function validateExportOptions(options: ExportOptions): void {
  if (options.width <= 0) {
    throw new Error("Export width must be greater than 0.");
  }

  if (options.height <= 0) {
    throw new Error("Export height must be greater than 0.");
  }
}