/** Supported chart types in the shared model. */
export type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "scatter"
  | "radar"
  | "gauge"
  | "funnel"
  | "echarts";

/** Generic shape for raw ECharts configuration. */
export type EChartsOptionLike = Record<string, unknown>;

/** Common fields shared by all chart definitions. */
export interface BaseChartDefinition {
  type: ChartType;
  title?: string;
}

/** Data series for Cartesian charts. */
export interface Series {
  id: string;
  label: string;
  data: number[];
}

/** Shared definition for line and bar charts. */
export interface CartesianChartDefinition extends BaseChartDefinition {
  type: "line" | "bar";
  labels: string[];
  series: Series[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

/** Single data item for a pie chart. */
export interface PieChartDatum {
  label: string;
  value: number;
}

/** Definition of a pie chart. */
export interface PieChartDefinition extends BaseChartDefinition {
  type: "pie";
  data: PieChartDatum[];
}

/** Single point for a scatter chart. */
export interface ScatterPoint {
  x: number;
  y: number;
}

/** Data series for a scatter chart. */
export interface ScatterSeries {
  id: string;
  label: string;
  data: ScatterPoint[];
}

/** Definition of a scatter chart. */
export interface ScatterChartDefinition extends BaseChartDefinition {
  type: "scatter";
  series: ScatterSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

/** Single radar axis definition. */
export interface RadarIndicator {
  label: string;
  max?: number;
}

/** Data series for a radar chart. */
export interface RadarSeries {
  id: string;
  label: string;
  data: number[];
}

/** Definition of a radar chart. */
export interface RadarChartDefinition extends BaseChartDefinition {
  type: "radar";
  indicators: RadarIndicator[];
  series: RadarSeries[];
}

/** Definition of a gauge chart. */
export interface GaugeChartDefinition extends BaseChartDefinition {
  type: "gauge";
  label: string;
  value: number;
  min?: number;
  max?: number;
}

/** Single data item for a funnel chart. */
export interface FunnelChartDatum {
  label: string;
  value: number;
}

/** Definition of a funnel chart. */
export interface FunnelChartDefinition extends BaseChartDefinition {
  type: "funnel";
  data: FunnelChartDatum[];
}

/** Definition for passing a raw ECharts option directly. */
export interface RawEChartsDefinition extends BaseChartDefinition {
  type: "echarts";
  option: EChartsOptionLike;
}

/** Union of all supported chart definitions. */
export type ChartDefinition =
  | CartesianChartDefinition
  | PieChartDefinition
  | ScatterChartDefinition
  | RadarChartDefinition
  | GaugeChartDefinition
  | FunnelChartDefinition
  | RawEChartsDefinition;