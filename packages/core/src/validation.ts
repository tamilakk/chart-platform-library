import type {
  ChartDefinition,
  CartesianChartDefinition,
  PieChartDefinition,
  Series
} from "./types";
import type { ExportOptions } from "./export-options";

function isNonEmptyString(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function validateSeries(
  series: Series,
  labelsCount: number,
  index: number
): void {
  if (!isNonEmptyString(series.id)) {
    throw new Error(`Series at index ${index} must have a non-empty id.`);
  }

  if (!isNonEmptyString(series.label)) {
    throw new Error(`Series "${series.id}" must have a non-empty label.`);
  }

  if (!Array.isArray(series.data) || series.data.length === 0) {
    throw new Error(`Series "${series.label}" must contain at least one data point.`);
  }

  if (series.data.length !== labelsCount) {
    throw new Error(
      `Series "${series.label}" data length must match labels length.`
    );
  }

  for (const [dataIndex, value] of series.data.entries()) {
    if (!isFiniteNumber(value)) {
      throw new Error(
        `Series "${series.label}" contains a non-finite value at index ${dataIndex}.`
      );
    }
  }
}

function validateCartesianChart(definition: CartesianChartDefinition): void {
  if (!Array.isArray(definition.labels) || definition.labels.length === 0) {
    throw new Error("Bar and line charts require at least one label.");
  }

  for (const [index, label] of definition.labels.entries()) {
    if (!isNonEmptyString(label)) {
      throw new Error(`Label at index ${index} must be a non-empty string.`);
    }
  }

  if (!Array.isArray(definition.series) || definition.series.length === 0) {
    throw new Error("Bar and line charts require at least one series.");
  }

  for (const [index, series] of definition.series.entries()) {
    validateSeries(series, definition.labels.length, index);
  }
}

function validatePieChart(definition: PieChartDefinition): void {
  if (!Array.isArray(definition.data) || definition.data.length === 0) {
    throw new Error("Pie chart requires at least one data item.");
  }

  for (const [index, item] of definition.data.entries()) {
    if (!isNonEmptyString(item.label)) {
      throw new Error(`Pie chart item at index ${index} must have a non-empty label.`);
    }

    if (!isFiniteNumber(item.value)) {
      throw new Error(
        `Pie chart item "${item.label}" must have a finite numeric value.`
      );
    }

    if (item.value < 0) {
      throw new Error(
        `Pie chart item "${item.label}" must not have a negative value.`
      );
    }
  }
}

export function validateChartDefinition(definition: ChartDefinition): void {
  if (!definition || typeof definition !== "object") {
    throw new Error("Chart definition must be a valid object.");
  }

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
  if (!options || typeof options !== "object") {
    throw new Error("Export options must be a valid object.");
  }

  if (!Number.isInteger(options.width) || options.width <= 0) {
    throw new Error("Export width must be a positive integer.");
  }

  if (!Number.isInteger(options.height) || options.height <= 0) {
    throw new Error("Export height must be a positive integer.");
  }

  if (
    options.background !== undefined &&
    !isNonEmptyString(options.background)
  ) {
    throw new Error("Export background must be a non-empty string when provided.");
  }
}