export type {
  ChartType,
  EChartsOptionLike,
  BaseChartDefinition,
  Series,
  CartesianChartDefinition,
  PieChartDatum,
  PieChartDefinition,
  ScatterPoint,
  ScatterSeries,
  ScatterChartDefinition,
  RadarIndicator,
  RadarSeries,
  RadarChartDefinition,
  GaugeChartDefinition,
  FunnelChartDatum,
  FunnelChartDefinition,
  RawEChartsDefinition,
  ChartDefinition
} from "./types";

export type { ExportOptions } from "./export-options";

export { validateChartDefinition, validateExportOptions } from "./validation";
export { toEChartsOption } from "./adapters/toEChartsOption";

export {
  monthlySalesBar,
  revenueVsCostsBar,
  userGrowthLine,
  trafficSourcesLine,
  deviceSharePie,
  heightWeightScatter,
  productQualityRadar,
  performanceGauge,
  conversionFunnel,
  rawMixedEChartsExample,
  demoCharts
} from "./examples";