import type {
  ChartDefinition,
  CartesianChartDefinition,
  FunnelChartDefinition,
  GaugeChartDefinition,
  PieChartDefinition,
  RadarChartDefinition,
  RadarIndicator,
  RadarSeries,
  RawEChartsDefinition,
  ScatterChartDefinition,
  ScatterSeries,
  Series
} from "./types";
import type { ExportOptions } from "./export-options";

function isNonEmptyString(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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

function validateLabeledValueData(
  data: Array<{ label: string; value: number }>,
  chartName: string
): void {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`${chartName} chart requires at least one data item.`);
  }

  for (const [index, item] of data.entries()) {
    if (!isNonEmptyString(item.label)) {
      throw new Error(
        `${chartName} chart item at index ${index} must have a non-empty label.`
      );
    }

    if (!isFiniteNumber(item.value)) {
      throw new Error(
        `${chartName} chart item "${item.label}" must have a finite numeric value.`
      );
    }

    if (item.value < 0) {
      throw new Error(
        `${chartName} chart item "${item.label}" must not have a negative value.`
      );
    }
  }
}

function validatePieChart(definition: PieChartDefinition): void {
  validateLabeledValueData(definition.data, "Pie");
}

function validateScatterSeries(series: ScatterSeries, index: number): void {
  if (!isNonEmptyString(series.id)) {
    throw new Error(`Scatter series at index ${index} must have a non-empty id.`);
  }

  if (!isNonEmptyString(series.label)) {
    throw new Error(`Scatter series "${series.id}" must have a non-empty label.`);
  }

  if (!Array.isArray(series.data) || series.data.length === 0) {
    throw new Error(
      `Scatter series "${series.label}" must contain at least one point.`
    );
  }

  for (const [pointIndex, point] of series.data.entries()) {
    if (!isFiniteNumber(point.x) || !isFiniteNumber(point.y)) {
      throw new Error(
        `Scatter series "${series.label}" contains a non-finite point at index ${pointIndex}.`
      );
    }
  }
}

function validateScatterChart(definition: ScatterChartDefinition): void {
  if (!Array.isArray(definition.series) || definition.series.length === 0) {
    throw new Error("Scatter chart requires at least one series.");
  }

  for (const [index, series] of definition.series.entries()) {
    validateScatterSeries(series, index);
  }
}

function validateRadarIndicator(
  indicator: RadarIndicator,
  index: number
): void {
  if (!isNonEmptyString(indicator.label)) {
    throw new Error(`Radar indicator at index ${index} must have a non-empty label.`);
  }

  if (indicator.max !== undefined && !isFiniteNumber(indicator.max)) {
    throw new Error(
      `Radar indicator "${indicator.label}" max must be a finite number.`
    );
  }

  if (indicator.max !== undefined && indicator.max <= 0) {
    throw new Error(
      `Radar indicator "${indicator.label}" max must be greater than zero.`
    );
  }
}

function validateRadarSeries(
  series: RadarSeries,
  indicatorsCount: number,
  index: number
): void {
  if (!isNonEmptyString(series.id)) {
    throw new Error(`Radar series at index ${index} must have a non-empty id.`);
  }

  if (!isNonEmptyString(series.label)) {
    throw new Error(`Radar series "${series.id}" must have a non-empty label.`);
  }

  if (!Array.isArray(series.data) || series.data.length === 0) {
    throw new Error(`Radar series "${series.label}" must contain data.`);
  }

  if (series.data.length !== indicatorsCount) {
    throw new Error(
      `Radar series "${series.label}" data length must match indicators length.`
    );
  }

  for (const [dataIndex, value] of series.data.entries()) {
    if (!isFiniteNumber(value)) {
      throw new Error(
        `Radar series "${series.label}" contains a non-finite value at index ${dataIndex}.`
      );
    }
  }
}

function validateRadarChart(definition: RadarChartDefinition): void {
  if (!Array.isArray(definition.indicators) || definition.indicators.length === 0) {
    throw new Error("Radar chart requires at least one indicator.");
  }

  for (const [index, indicator] of definition.indicators.entries()) {
    validateRadarIndicator(indicator, index);
  }

  if (!Array.isArray(definition.series) || definition.series.length === 0) {
    throw new Error("Radar chart requires at least one series.");
  }

  for (const [index, series] of definition.series.entries()) {
    validateRadarSeries(series, definition.indicators.length, index);
  }
}

function validateGaugeChart(definition: GaugeChartDefinition): void {
  if (!isNonEmptyString(definition.label)) {
    throw new Error("Gauge chart requires a non-empty label.");
  }

  if (!isFiniteNumber(definition.value)) {
    throw new Error("Gauge chart value must be a finite number.");
  }

  if (definition.min !== undefined && !isFiniteNumber(definition.min)) {
    throw new Error("Gauge chart min must be a finite number.");
  }

  if (definition.max !== undefined && !isFiniteNumber(definition.max)) {
    throw new Error("Gauge chart max must be a finite number.");
  }

  const min = definition.min ?? 0;
  const max = definition.max ?? 100;

  if (min >= max) {
    throw new Error("Gauge chart min must be lower than max.");
  }

  if (definition.value < min || definition.value > max) {
    throw new Error("Gauge chart value must be within min and max range.");
  }
}

function validateFunnelChart(definition: FunnelChartDefinition): void {
  validateLabeledValueData(definition.data, "Funnel");
}

function validateRawEChartsDefinition(definition: RawEChartsDefinition): void {
  if (!isPlainObject(definition.option)) {
    throw new Error("Raw ECharts definition requires a valid option object.");
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
    case "scatter":
      validateScatterChart(definition);
      return;
    case "radar":
      validateRadarChart(definition);
      return;
    case "gauge":
      validateGaugeChart(definition);
      return;
    case "funnel":
      validateFunnelChart(definition);
      return;
    case "echarts":
      validateRawEChartsDefinition(definition);
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