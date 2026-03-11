import type { ChartDefinition } from "@chart-platform/core";
import { BarChart } from "./BarChart";

type ChartRendererProps = {
  definition: ChartDefinition;
};

export function ChartRenderer({ definition }: ChartRendererProps) {
  switch (definition.type) {
    case "bar":
      return <BarChart definition={definition} />;
    case "line":
      return <div>Line chart is not implemented yet.</div>;
    case "pie":
      return <div>Pie chart is not implemented yet.</div>;
    default:
      return <div>Unsupported chart type.</div>;
  }
}