# @chart-platform/server-renderer

Server-side SVG and PNG renderer for [Chart Platform Library](https://github.com/tamilakk/chart-platform-library).

Renders a `ChartDefinition` from `@chart-platform/core` on the server — no browser, no DOM required. Outputs a static SVG string, a PNG buffer, or base64-encoded versions of either. Also exports `ChartServerImage`, an async React Server Component for Next.js App Router.

## Installation

```bash
npm install @chart-platform/core @chart-platform/server-renderer
```

## Exports

| Export | Description |
|---|---|
| `renderToSVG()` | Renders a chart to an SVG string |
| `renderToPNG()` | Renders a chart to a PNG `Buffer` |
| `renderToSVGBase64()` | Renders a chart to a base64-encoded SVG string |
| `renderToPNGBase64()` | Renders a chart to a base64-encoded PNG string |
| `ChartServerImage` | Async React Server Component — inline SVG |

## Generate a PNG file

```ts
import { renderToPNG } from "@chart-platform/server-renderer";
import { writeFileSync } from "fs";
import type { ChartDefinition } from "@chart-platform/core";

const weeklyOrders: ChartDefinition = {
  type: "bar",
  title: "Weekly Orders",
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  series: [{ id: "orders", label: "Orders", data: [34, 47, 29, 61, 55] }]
};

const png = await renderToPNG(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });
writeFileSync("chart.png", png);
```

## Generate an SVG file

```ts
import { renderToSVG } from "@chart-platform/server-renderer";

const svg = await renderToSVG(weeklyOrders, { width: 800, height: 400 });
writeFileSync("chart.svg", svg);
```

## Serve a chart over HTTP (Express)

```ts
import express from "express";
import { renderToPNG } from "@chart-platform/server-renderer";

const app = express();

app.get("/chart.png", async (req, res) => {
  const png = await renderToPNG(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });
  res.set("Content-Type", "image/png").send(png);
});

app.listen(3000);
```

## Embed in an email or JSON API (base64)

```ts
import { renderToPNGBase64 } from "@chart-platform/server-renderer";

const base64 = await renderToPNGBase64(weeklyOrders, { width: 800, height: 400, background: "#ffffff" });

// Ready to embed in HTML
const html = `<img src="data:image/png;base64,${base64}" />`;
```

## React Server Component — Next.js App Router

`ChartServerImage` is an async RSC that renders a chart as an inline SVG.
No DOM, no JavaScript sent to the browser, no hydration.

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

`ChartServerImage` accepts the same `definition` and `theme` props as `ChartRenderer` from `@chart-platform/react-renderer` — so one chart definition works in all environments:

```
weeklyOrders ──→ <ChartRenderer />       (client, interactive)
             ──→ renderToPNG()           (Node.js, PNG file)
             ──→ <ChartServerImage />    (Next.js RSC, inline SVG)
```

### ChartServerImage props

| Prop | Type | Default | Description |
|---|---|---|---|
| `definition` | `ChartDefinition` | required | Chart to render |
| `width` | `number` | `800` | Output width in pixels |
| `height` | `number` | `400` | Output height in pixels |
| `theme` | `ThemeName \| ChartTheme` | `"light"` | Built-in theme or custom theme object |
| `background` | `string` | — | Background colour override |
| `aria-label` | `string` | chart title | Accessible label |

## Theming

All render functions and `ChartServerImage` accept an optional `theme` parameter:

```ts
// Built-in theme by name
await renderToSVG(weeklyOrders, { width: 800, height: 400 }, "dark");
await renderToPNG(weeklyOrders, { width: 800, height: 400 }, "minimal");

// Custom theme object — unset fields fall back to light theme defaults
import type { ChartTheme } from "@chart-platform/core";

const customTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c"],
  backgroundColor: "#1e1b2e",
  textColor: "#c4b5fd"
};

await renderToSVG(weeklyOrders, { width: 800, height: 400 }, customTheme);
```

| Theme | Background | Palette |
|---|---|---|
| `"light"` (default) | white | blue-toned |
| `"dark"` | `#1e2030` | vibrant |
| `"minimal"` | white | monochrome |

## Export options

| Field | Type | Required | Description |
|---|---|---|---|
| `width` | `number` | ✅ | Output width in pixels |
| `height` | `number` | ✅ | Output height in pixels |
| `background` | `string` | — | Background colour (overrides theme) |

## Requirements

- Node.js 22 or newer

## Related packages

- [`@chart-platform/core`](https://www.npmjs.com/package/@chart-platform/core) — shared types, validation and ECharts adapter
- [`@chart-platform/react-renderer`](https://www.npmjs.com/package/@chart-platform/react-renderer) — interactive React chart component

## License

MIT
