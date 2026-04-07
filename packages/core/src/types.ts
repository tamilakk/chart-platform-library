export type ChartType = "line" | "bar" | "pie";

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

export type ChartDefinition =
  | CartesianChartDefinition
  | PieChartDefinition;