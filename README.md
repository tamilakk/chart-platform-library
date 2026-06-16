# Chart Platform Library

Multiplatform library for defining a chart once and rendering it in two ways:

- as an interactive React component on the client,
- as a static SVG or PNG image on the backend,
- as an async React Server Component (RSC) in Next.js App Router and similar frameworks.

This repository is the implementation part of the bachelor thesis focused on reducing duplication between frontend chart rendering and backend export through a shared chart definition.

## Current functionality

The project currently provides:

- shared chart definition in `@chart-platform/core`,
- runtime validation of input data,
- transformation of chart definitions to Apache ECharts options,
- built-in theme support (`light`, `dark`, `minimal`) and custom theme objects,
- React renderer in `@chart-platform/react-renderer`,
- backend SVG and PNG export in `@chart-platform/server-renderer`,
- async React Server Component `ChartServerImage` for Next.js App Router,
- demo application showing supported chart types and themes,
- automated tests and CI pipeline.

## How it works

1. A developer creates a shared `ChartDefinition`.
2. The definition is validated by the shared core package.
3. The shared adapter converts the definition into an Apache ECharts option object.
4. On the frontend, the React renderer displays the chart as an interactive component.
5. On the backend, the server renderer generates either an SVG string or a PNG buffer from the same definition.
6. In server component frameworks (Next.js App Router), the same definition can be passed to `ChartServerImage` — an async RSC that renders an inline SVG without any DOM or hydration.

This shared pipeline is the central idea of the project: define once, render on multiple platforms.

## Supported chart types

- bar chart
- line chart
- pie chart
- scatter chart
- radar chart
- gauge chart
- funnel chart
- raw Apache ECharts configuration

## Project structure

- `packages/core` – shared types, validation and ECharts adapter
- `packages/react-renderer` – React chart renderer
- `packages/server-renderer` – backend SVG/PNG export + `ChartServerImage` RSC
- `apps/demo` – demo application

## Technologies

The project is implemented as a pnpm monorepo using:

- TypeScript
- React
- Apache ECharts
- Vite
- Vitest
- Sharp

## Using the packages

The library is published as three independent npm packages.
Install only what you need.

---

### Defining a chart

All rendering functions and components accept a `ChartDefinition` from `@chart-platform/core`:

```ts
import type { ChartDefinition } from "@chart-platform/core";

const weeklyOrders: ChartDefinition = {
  type: "bar",
  title: "Weekly Orders",
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  series: [
    { id: "orders", label: "Orders", data: [34, 47, 29, 61, 55] }
  ]
};
```

Pass the same object to any renderer — client, server, or RSC.

---

### React — interactive chart in the browser

```bash
npm install @chart-platform/core @chart-platform/react-renderer echarts echarts-for-react
```

```tsx
import { ChartRenderer } from "@chart-platform/react-renderer";

export default function App() {
  return <ChartRenderer definition={weeklyOrders} height={400} />;
}
```

The component renders an interactive ECharts chart with hover, tooltips and zoom.

---

### Node.js — generate a PNG or SVG on the server

```bash
npm install @chart-platform/core @chart-platform/server-renderer
```

```js
const { renderToPNG, renderToSVG } = require("@chart-platform/server-renderer");
const { writeFileSync } = require("fs");

// PNG
const png = await renderToPNG(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });
writeFileSync("chart.png", png);

// SVG
const svg = await renderToSVG(weeklyOrders, { width: 800, height: 400 });
writeFileSync("chart.svg", svg);
```

---

### Next.js App Router — async React Server Component

`ChartServerImage` is an async RSC exported from `@chart-platform/server-renderer`.
It renders a chart as an inline SVG on the server — no DOM, no hydration, no JavaScript sent to the browser.

```tsx
import { ChartServerImage } from "@chart-platform/server-renderer";

export default async function Page() {
  return (
    <ChartServerImage
      definition={weeklyOrders}
      width={800}
      height={400}
      theme="dark"
    />
  );
}
```

Both `ChartRenderer` and `ChartServerImage` accept the same `definition` and `theme` props,
so one chart definition works in all rendering contexts:

```
weeklyOrders ──→ <ChartRenderer />       (client, interactive)
             ──→ renderToPNG()           (server, PNG file)
             ──→ <ChartServerImage />    (Next.js RSC, inline SVG)
```

---

### Theming

All renderers accept an optional `theme` prop. Three built-in themes are available:

```tsx
// Built-in theme by name
<ChartRenderer definition={weeklyOrders} theme="dark" />
<ChartRenderer definition={weeklyOrders} theme="minimal" />

// Custom theme object — unset fields fall back to the light theme defaults
import type { ChartTheme } from "@chart-platform/core";

const customTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c", "#16a34a"],
  backgroundColor: "#faf5ff",
  textColor: "#4c1d95",
  axisColor: "#ddd6fe"
};

<ChartRenderer definition={weeklyOrders} theme={customTheme} />
```

The same theme prop is accepted by `renderToSVG`, `renderToPNG`, `renderToSVGBase64`,
`renderToPNGBase64`, and `ChartServerImage`.

| Theme name | Background | Palette |
|---|---|---|
| `light` (default) | white | blue-toned |
| `dark` | `#1e2030` | vibrant |
| `minimal` | white | monochrome |

---

### Serving a chart over HTTP (Express example)

```js
const express = require("express");
const { renderToPNG } = require("@chart-platform/server-renderer");

const app = express();

app.get("/chart.png", async (req, res) => {
  const png = await renderToPNG(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });
  res.set("Content-Type", "image/png").send(png);
});

app.listen(3000);
```

---

### Returning a chart as a base64 string (for emails or JSON APIs)

```js
const { renderToPNGBase64 } = require("@chart-platform/server-renderer");

const base64 = await renderToPNGBase64(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });

// Embed directly in HTML
const html = `<img src="data:image/png;base64,${base64}" />`;
```

---

### Validation

The library validates chart definitions at runtime before rendering.
Invalid input throws an error with a descriptive message instead of failing silently:

```js
// 3 labels but only 2 data points — caught before any rendering happens
const broken = {
  type: "bar",
  title: "Broken",
  labels: ["Jan", "Feb", "Mar"],
  series: [{ id: "s1", label: "Sales", data: [100, 200] }]
};

await renderToPNG(broken, { width: 800, height: 400 });
// Error: data length must match labels length
```

The same validation runs inside `ChartRenderer` and `ChartServerImage` —
instead of crashing, each renderer surfaces a clear error message.

---

## Export options

Static backend export uses explicit export parameters:

| Field | Type | Description |
|---|---|---|
| `width` | `number` | Output width in pixels (required) |
| `height` | `number` | Output height in pixels (required) |
| `background` | `string` | Background colour override (optional) |

---

## Requirements

- Node.js 22 or newer
- pnpm 10 or newer

## Contributing — clone and run locally

Clone the repository and install dependencies:

```bash
pnpm install
```

## Development commands

Build all packages:

```bash
pnpm build
```

Run the demo application:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test:coverage
```

Run the backend rendering demo:

```bash
pnpm demo:server
```

Run the basic verification pipeline locally:

```bash
pnpm check
```

---

## Testing

The current test suite covers:

- shared chart definitions and type-level constraints,
- runtime validation of chart input data,
- transformation of shared chart definitions into Apache ECharts options,
- theme application for all built-in themes and custom theme objects,
- React chart rendering (`ChartRenderer`),
- async React Server Component rendering (`ChartServerImage`),
- backend SVG export,
- backend PNG export.

---

## Thesis context

This repository is the implementation part of the bachelor thesis:

**Multiplatformní open-source knihovna pro generování grafů v Reactu na klientu a jako obrázek na backendu**

The thesis focuses on the design and implementation of a shared chart library that can render interactive charts in React and generate static chart images on the backend from the same chart definition.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
