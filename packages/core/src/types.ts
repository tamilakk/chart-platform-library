export type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "scatter"
  | "radar"
  | "gauge"
  | "funnel"
  | "echarts";

export type EChartsOptionLike = Record<string, unknown>;

export interface BaseChartDefinition {
  type: ChartType;
  title?: string;
}

export interface Series {
  id: string;
  label: string;
  data: number[];
}

export interface CartesianChartDefinition extends BaseChartDefinition {
  type: "line" | "bar";
  labels: string[];
  series: Series[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface PieChartDatum {
  label: string;
  value: number;
}

export interface PieChartDefinition extends BaseChartDefinition {
  type: "pie";
  data: PieChartDatum[];
}

export interface ScatterPoint {
  x: number;
  y: number;
}

export interface ScatterSeries {
  id: string;
  label: string;
  data: ScatterPoint[];
}

export interface ScatterChartDefinition extends BaseChartDefinition {
  type: "scatter";
  series: ScatterSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface RadarIndicator {
  label: string;
  max?: number;
}

export interface RadarSeries {
  id: string;
  label: string;
  data: number[];
}

export interface RadarChartDefinition extends BaseChartDefinition {
  type: "radar";
  indicators: RadarIndicator[];
  series: RadarSeries[];
}

export interface GaugeChartDefinition extends BaseChartDefinition {
  type: "gauge";
  label: string;
  value: number;
  min?: number;
  max?: number;
}

export interface FunnelChartDatum {
  label: string;
  value: number;
}

export interface FunnelChartDefinition extends BaseChartDefinition {
  type: "funnel";
  data: FunnelChartDatum[];
}

export interface RawEChartsDefinition extends BaseChartDefinition {
  type: "echarts";
  option: EChartsOptionLike;
}

export type ChartDefinition =
  | CartesianChartDefinition
  | PieChartDefinition
  | ScatterChartDefinition
  | RadarChartDefinition
  | GaugeChartDefinition
  | FunnelChartDefinition
  | RawEChartsDefinition;