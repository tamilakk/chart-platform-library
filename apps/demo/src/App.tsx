import { ChartRenderer } from "@chart-platform/react-renderer";
import { ValidationDemo } from "./ValidationDemo";
import { ThemeDemo } from "./ThemeDemo";
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
} from "./charts";

/**
 * Renders the demo application with example charts.
 *
 * @returns Demo page with frontend chart examples.
 */
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

      <ThemeDemo />

      <section className="ssr-demo-section">
        <div className="ssr-demo-header">
          <h2 className="ssr-demo-title">Server-side rendering</h2>
          <p className="ssr-demo-description">
            The same <code>ChartDefinition</code> works on both the client and the server.
            Use <code>&lt;ChartRenderer /&gt;</code> for interactive client charts and{" "}
            <code>&lt;ChartServerImage /&gt;</code> as an async React Server Component
            (e.g. Next.js App Router) — no DOM required, no hydration overhead.
          </p>
        </div>
        <div className="ssr-comparison">
          <div className="ssr-block">
            <span className="ssr-badge">Client — @chart-platform/react-renderer</span>
            <pre className="ssr-code">{`import { ChartRenderer } from "@chart-platform/react-renderer";

// Works in any React client component
<ChartRenderer
  definition={myChart}
  height={400}
  theme="dark"
/>`}</pre>
          </div>
          <div className="ssr-block">
            <span className="ssr-badge">Server — @chart-platform/server-renderer</span>
            <pre className="ssr-code">{`import { ChartServerImage } from "@chart-platform/server-renderer";

// Async React Server Component — no DOM, no hydration
// Works in Next.js App Router, Remix, etc.
export default async function Page() {
  return (
    <ChartServerImage
      definition={myChart}
      width={800}
      height={400}
      theme="dark"
    />
  );
}`}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}