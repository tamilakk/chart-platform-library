import { ChartRenderer } from "@chart-platform/react-renderer";
import { ValidationDemo } from "./ValidationDemo";
import {
  conversionFunnel,
  deviceSharePie,
  heightWeightScatter,
  monthlySalesBar,
  performanceGauge,
  productQualityRadar,
  rawMixedEChartsExample,
  revenueVsCostsBar,
  trafficSourcesLine,
  userGrowthLine
} from "@chart-platform/core";

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

        <article className="chart-card">
          <h2>Scatter chart</h2>
          <ChartRenderer definition={heightWeightScatter} height={360} />
        </article>

        <article className="chart-card">
          <h2>Radar chart</h2>
          <ChartRenderer definition={productQualityRadar} height={360} />
        </article>

        <article className="chart-card">
          <h2>Gauge chart</h2>
          <ChartRenderer definition={performanceGauge} height={360} />
        </article>

        <article className="chart-card">
          <h2>Funnel chart</h2>
          <ChartRenderer definition={conversionFunnel} height={360} />
        </article>

        <article className="chart-card chart-card--wide">
          <h2>Pie chart</h2>
          <ChartRenderer definition={deviceSharePie} height={420} />
        </article>

        <article className="chart-card chart-card--wide">
          <h2>Raw ECharts mixed chart</h2>
          <ChartRenderer definition={rawMixedEChartsExample} height={420} />
        </article>

        <ValidationDemo />
      </section>
    </main>
  );
}