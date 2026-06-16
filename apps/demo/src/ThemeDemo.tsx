import { ChartRenderer } from "@chart-platform/react-renderer";
import type { ChartTheme, ThemeName } from "@chart-platform/core";
import { revenueVsCostsBar, userGrowthLine } from "./charts";

const BUILT_IN_THEMES: { name: ThemeName; label: string; description: string }[] = [
  {
    name: "light",
    label: "Light",
    description: "Default theme — white background, blue-toned palette."
  },
  {
    name: "dark",
    label: "Dark",
    description: "Dark background with a vibrant colour palette."
  },
  {
    name: "minimal",
    label: "Minimal",
    description: "Clean monochrome palette for print or neutral contexts."
  }
];

const customTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c", "#16a34a"],
  backgroundColor: "#faf5ff",
  textColor: "#4c1d95",
  axisColor: "#ddd6fe"
};

/**
 * Demonstrates built-in themes and a custom theme using the same chart definition.
 *
 * @returns Theme demo section.
 */
export function ThemeDemo() {
  return (
    <section className="theme-demo-section">
      <div className="theme-demo-header">
        <h2 className="theme-demo-title">Theme support</h2>
        <p className="theme-demo-description">
          The same <code>ChartDefinition</code> rendered with different themes.
          Pass a theme name or a custom theme object to{" "}
          <code>&lt;ChartRenderer /&gt;</code>, <code>renderToSVG()</code> and{" "}
          <code>renderToPNG()</code>.
        </p>
      </div>

      {/* Built-in themes */}
      <div className="theme-grid">
        {BUILT_IN_THEMES.map(({ name, label, description }) => (
          <div
            key={name}
            className={`theme-card theme-card--${name}`}
          >
            <div className="theme-card-meta">
              <span className="theme-badge">theme="{name}"</span>
              <span className="theme-label">{label}</span>
              <p className="theme-card-desc">{description}</p>
            </div>
            <ChartRenderer
              definition={revenueVsCostsBar}
              height={280}
              theme={name}
            />
          </div>
        ))}
      </div>

      {/* Custom theme */}
      <div className="theme-card theme-card--custom">
        <div className="theme-card-meta">
          <span className="theme-badge">custom ChartTheme object</span>
          <span className="theme-label">Custom theme</span>
          <p className="theme-card-desc">
            Pass any <code>ChartTheme</code> object to override individual
            properties. Unset fields fall back to the light theme defaults.
          </p>
          <pre className="theme-code">{`const customTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c", "#16a34a"],
  backgroundColor: "#faf5ff",
  textColor: "#4c1d95",
  axisColor: "#ddd6fe"
};

<ChartRenderer definition={chart} theme={customTheme} />`}</pre>
        </div>
        <ChartRenderer
          definition={userGrowthLine}
          height={280}
          theme={customTheme}
        />
      </div>
    </section>
  );
}
