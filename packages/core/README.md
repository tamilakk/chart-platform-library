# @chart-platform/core

Shared chart definitions, runtime validation and Apache ECharts adapter for [Chart Platform Library](https://github.com/tamilakk/chart-platform-library).

This package is the foundation of the library — it defines the `ChartDefinition` type used by both the React renderer on the client and the server-side renderer on the backend.

## Installation

```bash
npm install @chart-platform/core
```

## What's inside

- **`ChartDefinition`** — discriminated union type for all supported chart types
- **`validateChartDefinition()`** — runtime validation with descriptive errors
- **`toEChartsOption()`** — converts a `ChartDefinition` into an Apache ECharts option object
- **`ChartTheme` / `ThemeName`** — theme types and three built-in themes (`light`, `dark`, `minimal`)
- **`resolveTheme()`** — merges a custom theme on top of the light defaults

## Defining a chart

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

Pass this object to `@chart-platform/react-renderer` or `@chart-platform/server-renderer` — it works the same way in both.

## Supported chart types

| `type` | Description |
|---|---|
| `"bar"` | Bar chart — single or multi-series |
| `"line"` | Line chart — single or multi-series |
| `"pie"` | Pie / donut chart |
| `"scatter"` | Scatter plot |
| `"radar"` | Radar / spider chart |
| `"gauge"` | Gauge chart |
| `"funnel"` | Funnel chart |
| `"echarts"` | Raw Apache ECharts option (full control) |

## Theming

Three built-in themes are available by name. You can also pass a custom `ChartTheme` object.

```ts
import type { ChartTheme } from "@chart-platform/core";
import { resolveTheme, darkTheme } from "@chart-platform/core";

// Resolve a built-in theme by name
const theme = resolveTheme("dark");

// Or define a custom theme — unset fields fall back to light theme defaults
const customTheme: ChartTheme = {
  colors: ["#7c3aed", "#db2777", "#ea580c"],
  backgroundColor: "#faf5ff",
  textColor: "#4c1d95",
  axisColor: "#ddd6fe"
};
```

## Validation

```ts
import { validateChartDefinition } from "@chart-platform/core";

// Throws a descriptive error if the definition is invalid
validateChartDefinition(myChart);
```

Common errors caught:
- missing `labels` or `series`
- data length does not match labels length
- empty pie chart data
- unknown `type`

## Using the ECharts adapter directly

```ts
import { toEChartsOption } from "@chart-platform/core";

const option = toEChartsOption(myChart, "dark");
// Pass `option` to any ECharts instance
```

## Related packages

- [`@chart-platform/react-renderer`](https://www.npmjs.com/package/@chart-platform/react-renderer) — interactive React chart component
- [`@chart-platform/server-renderer`](https://www.npmjs.com/package/@chart-platform/server-renderer) — server-side SVG/PNG export and React Server Component

## License

MIT
