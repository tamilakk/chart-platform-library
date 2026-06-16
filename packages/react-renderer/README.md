# @chart-platform/react-renderer

Interactive React chart component for [Chart Platform Library](https://github.com/tamilakk/chart-platform-library).

Renders a `ChartDefinition` from `@chart-platform/core` as an interactive Apache ECharts chart — with hover, tooltips and zoom. The same definition can also be exported as SVG or PNG on the server using `@chart-platform/server-renderer`.

## Installation

```bash
npm install @chart-platform/core @chart-platform/react-renderer echarts echarts-for-react
```

## Usage

```tsx
import { ChartRenderer } from "@chart-platform/react-renderer";
import type { ChartDefinition } from "@chart-platform/core";

const weeklyOrders: ChartDefinition = {
  type: "bar",
  title: "Weekly Orders",
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  series: [
    { id: "orders", label: "Orders", data: [34, 47, 29, 61, 55] }
  ]
};

export default function App() {
  return <ChartRenderer definition={weeklyOrders} height={400} />;
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `definition` | `ChartDefinition` | required | Chart to render |
| `height` | `number` | `400` | Chart height in pixels |
| `theme` | `ThemeName \| ChartTheme` | `"light"` | Built-in theme name or custom theme object |
| `aria-label` | `string` | chart title | Accessible label for screen readers |

## Theming

Three built-in themes are available — pass a name string or a custom `ChartTheme` object:

```tsx
import type { ChartTheme } from "@chart-platform/core";

// Built-in theme by name
<ChartRenderer definition={weeklyOrders} theme="dark" />
<ChartRenderer definition={weeklyOrders} theme="minimal" />

// Custom theme — unset fields fall back to light theme defaults
const myTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c", "#16a34a"],
  backgroundColor: "#faf5ff",
  textColor: "#4c1d95",
  axisColor: "#ddd6fe"
};

<ChartRenderer definition={weeklyOrders} theme={myTheme} />
```

| Theme | Background | Palette |
|---|---|---|
| `"light"` (default) | white | blue-toned |
| `"dark"` | `#1e2030` | vibrant |
| `"minimal"` | white | monochrome |

## Error handling

Invalid chart definitions are caught before rendering. Instead of crashing, the component displays an accessible error message:

```tsx
// data has 2 items but labels has 3 — ChartRenderer shows an error instead of throwing
const broken: ChartDefinition = {
  type: "bar",
  title: "Broken",
  labels: ["Jan", "Feb", "Mar"],
  series: [{ id: "s", label: "Sales", data: [100, 200] }]
};

<ChartRenderer definition={broken} />
// Renders: "Chart error: data length must match labels length"
```

## Using the same definition on the server

The same `ChartDefinition` object works with `@chart-platform/server-renderer` for PNG/SVG export or as a React Server Component in Next.js:

```ts
// Server — generate a PNG file
import { renderToPNG } from "@chart-platform/server-renderer";
const png = await renderToPNG(weeklyOrders, { width: 800, height: 400 });
```

```tsx
// Next.js App Router — inline SVG, no hydration
import { ChartServerImage } from "@chart-platform/server-renderer";
<ChartServerImage definition={weeklyOrders} theme="dark" />
```

## Peer dependencies

| Package | Version |
|---|---|
| `react` | `>=18` |
| `react-dom` | `>=18` |
| `echarts` | `>=6` |
| `echarts-for-react` | `>=3` |

## Related packages

- [`@chart-platform/core`](https://www.npmjs.com/package/@chart-platform/core) — shared types, validation and ECharts adapter
- [`@chart-platform/server-renderer`](https://www.npmjs.com/package/@chart-platform/server-renderer) — server-side SVG/PNG export and React Server Component

## License

MIT
