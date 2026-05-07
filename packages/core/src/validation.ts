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

/**
 * Checks whether a string is defined and not empty.
 *
 * @param value Value to check.
 * @returns True if the value is a non-empty string.
 */
function isNonEmptyString(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks whether a value is a finite number.
 *
 * @param value Value to check.
 * @returns True if the value is finite.
 */
function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Checks whether a value is a plain object.
 *
 * @param value Value to check.
 * @returns True if the value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * Validates one Cartesian series.
 *
 * @param series Series to validate.
 * @param labelsCount Expected number of labels.
 * @param index Series index used in error messages.
 */
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

/**
 * Validates a bar or line chart definition.
 *
 * @param definition Chart definition to validate.
 */
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

/**
 * Validates labeled numeric data used by pie and funnel charts.
 *
 * @param data Data items to validate.
 * @param chartName Chart name used in error messages.
 */
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

/**
 * Validates a pie chart definition.
 *
 * @param definition Pie chart definition to validate.
 */
function validatePieChart(definition: PieChartDefinition): void {
  validateLabeledValueData(definition.data, "Pie");
}

/**
 * Validates one scatter series.
 *
 * @param series Scatter series to validate.
 * @param index Series index used in error messages.
 */
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

/**
 * Validates a scatter chart definition.
 *
 * @param definition Scatter chart definition to validate.
 */
function validateScatterChart(definition: ScatterChartDefinition): void {
  if (!Array.isArray(definition.series) || definition.series.length === 0) {
    throw new Error("Scatter chart requires at least one series.");
  }

  for (const [index, series] of definition.series.entries()) {
    validateScatterSeries(series, index);
  }
}

/**
 * Validates one radar indicator.
 *
 * @param indicator Radar indicator to validate.
 * @param index Indicator index used in error messages.
 */
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

/**
 * Validates one radar series.
 *
 * @param series Radar series to validate.
 * @param indicatorsCount Expected number of indicators.
 * @param index Series index used in error messages.
 */
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

/**
 * Validates a radar chart definition.
 *
 * @param definition Radar chart definition to validate.
 */
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

/**
 * Validates a gauge chart definition.
 *
 * @param definition Gauge chart definition to validate.
 */
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

/**
 * Validates a funnel chart definition.
 *
 * @param definition Funnel chart definition to validate.
 */
function validateFunnelChart(definition: FunnelChartDefinition): void {
  validateLabeledValueData(definition.data, "Funnel");
}

/**
 * Validates a raw ECharts definition.
 *
 * @param definition Raw ECharts definition to validate.
 */
function validateRawEChartsDefinition(definition: RawEChartsDefinition): void {
  if (!isPlainObject(definition.option)) {
    throw new Error("Raw ECharts definition requires a valid option object.");
  }
}

/**
 * Validates a shared chart definition.
 *
 * @param definition Chart definition to validate.
 */
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

/**
 * Validates export options for static output.
 *
 * @param options Export options to validate.
 */
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