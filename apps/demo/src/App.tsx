import { ChartRenderer } from "@chart-platform/react-renderer";
import { ValidationDemo } from "./ValidationDemo";
import {
  monthlySalesBar,
  revenueVsCostsBar,
  userGrowthLine,
  trafficSourcesLine,
  deviceSharePie
} from "./examples";

export default function App() {
  return (
    <main className="page">
      <header className="page-header">
        <h1>Chart Platform Library Demo</h1>
        <p>
          Interactive charts rendered from a shared chart definition used across
          frontend and backend rendering.
        </p>
      </header>

      <section className="demo-grid">
        <article className="chart-card">
          <h2>Bar chart — single series</h2>
          <ChartRenderer definition={monthlySalesBar} height={360} />
        </article>

        <article className="chart-card">
          <h2>Bar chart — multi series</h2>
          <ChartRenderer definition={revenueVsCostsBar} height={360} />
        </article>

        <article className="chart-card">
          <h2>Line chart — single series</h2>
          <ChartRenderer definition={userGrowthLine} height={360} />
        </article>

        <article className="chart-card">
          <h2>Line chart — multi series</h2>
          <ChartRenderer definition={trafficSourcesLine} height={360} />
        </article>

        <article className="chart-card chart-card--wide">
          <h2>Pie chart</h2>
          <ChartRenderer definition={deviceSharePie} height={420} />
        </article>

        <ValidationDemo />
      </section>
    </main>
  );
}