import type { ChartDefinition } from "@chart-platform/core";
import { ChartRenderer } from "@chart-platform/react-renderer";

const chart: ChartDefinition = {
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

export default function App() {
  return (
    <main className="page">
      <h1>Chart Platform Library Demo</h1>
      <p>Interactive bar chart rendered from a shared chart definition.</p>

      <div className="chart-card">
        <ChartRenderer definition={chart} height={400} />
      </div>
    </main>
  );
}