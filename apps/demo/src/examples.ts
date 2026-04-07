import type { ChartDefinition } from "@chart-platform/core";

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