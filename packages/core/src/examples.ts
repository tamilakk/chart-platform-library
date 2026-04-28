import type { ChartDefinition } from "./types";

export const monthlySalesBar: ChartDefinition = {
  type: "bar",
  title: "Monthly Sales",
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  series: [
    {
      id: "sales",
      label: "Sales",
      data: [12, 19, 9, 25, 17]
    }
  ]
};

export const revenueVsCostsBar: ChartDefinition = {
  type: "bar",
  title: "Revenue vs Costs",
  labels: ["Q1", "Q2", "Q3", "Q4"],
  series: [
    {
      id: "revenue",
      label: "Revenue",
      data: [120, 150, 180, 210]
    },
    {
      id: "costs",
      label: "Costs",
      data: [80, 95, 110, 130]
    }
  ]
};

export const userGrowthLine: ChartDefinition = {
  type: "line",
  title: "User Growth",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series: [
    {
      id: "users",
      label: "Users",
      data: [120, 180, 260, 340, 420, 510]
    }
  ]
};

export const trafficSourcesLine: ChartDefinition = {
  type: "line",
  title: "Traffic Sources",
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [
    {
      id: "organic",
      label: "Organic",
      data: [120, 150, 170, 165, 190, 210, 220]
    },
    {
      id: "paid",
      label: "Paid",
      data: [60, 75, 90, 95, 100, 120, 130]
    },
    {
      id: "social",
      label: "Social",
      data: [30, 35, 40, 45, 55, 65, 70]
    }
  ]
};

export const deviceSharePie: ChartDefinition = {
  type: "pie",
  title: "Device Share",
  data: [
    { label: "Desktop", value: 48 },
    { label: "Mobile", value: 38 },
    { label: "Tablet", value: 14 }
  ]
};

export const heightWeightScatter: ChartDefinition = {
  type: "scatter",
  title: "Height and Weight",
  xAxisLabel: "Height",
  yAxisLabel: "Weight",
  series: [
    {
      id: "group-a",
      label: "Group A",
      data: [
        { x: 160, y: 55 },
        { x: 165, y: 60 },
        { x: 170, y: 68 },
        { x: 175, y: 72 },
        { x: 180, y: 80 }
      ]
    },
    {
      id: "group-b",
      label: "Group B",
      data: [
        { x: 158, y: 52 },
        { x: 168, y: 64 },
        { x: 172, y: 70 },
        { x: 178, y: 76 },
        { x: 185, y: 84 }
      ]
    }
  ]
};

export const productQualityRadar: ChartDefinition = {
  type: "radar",
  title: "Product Quality",
  indicators: [
    { label: "Performance", max: 100 },
    { label: "Reliability", max: 100 },
    { label: "Accessibility", max: 100 },
    { label: "Documentation", max: 100 },
    { label: "Maintainability", max: 100 }
  ],
  series: [
    {
      id: "current",
      label: "Current version",
      data: [82, 88, 70, 76, 90]
    },
    {
      id: "target",
      label: "Target version",
      data: [90, 92, 90, 85, 95]
    }
  ]
};

export const performanceGauge: ChartDefinition = {
  type: "gauge",
  title: "Rendering Performance",
  label: "Score",
  value: 84,
  min: 0,
  max: 100
};

export const conversionFunnel: ChartDefinition = {
  type: "funnel",
  title: "Conversion Funnel",
  data: [
    { label: "Visits", value: 1000 },
    { label: "Product views", value: 760 },
    { label: "Cart", value: 420 },
    { label: "Checkout", value: 260 },
    { label: "Purchase", value: 180 }
  ]
};

export const rawMixedEChartsExample: ChartDefinition = {
  type: "echarts",
  title: "Raw ECharts Mixed Example",
  option: {
    title: {
      text: "Raw ECharts Mixed Example"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      top: 32
    },
    grid: {
      left: 48,
      right: 24,
      top: 80,
      bottom: 48,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "Revenue",
        type: "bar",
        data: [120, 150, 180, 210, 240]
      },
      {
        name: "Trend",
        type: "line",
        data: [100, 140, 170, 220, 260]
      }
    ]
  }
};


export const demoCharts = {
  monthlySalesBar,
  revenueVsCostsBar,
  userGrowthLine,
  trafficSourcesLine,
  deviceSharePie,
  heightWeightScatter,
  productQualityRadar,
  performanceGauge,
  conversionFunnel,
  rawMixedEChartsExample
};