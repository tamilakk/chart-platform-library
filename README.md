

# Chart Platform Library

Multiplatform open-source chart library for defining a chart once and rendering it both as an interactive React component on the client and as a static SVG or PNG image on the backend.

The project is part of a bachelor thesis focused on reducing duplication between frontend chart rendering and backend image export by introducing a shared chart definition and a shared transformation pipeline.

## Why Apache ECharts

Apache ECharts was selected as the rendering foundation because it offers:

- good React integration through `echarts-for-react`
- support for multiple rendering modes
- server-side rendering capabilities suitable for static export
- strong fit for a multiplatform charting workflow

## Architecture

The project is organized as a pnpm monorepo with three main packages:

- `@chart-platform/core`
  - shared chart types
  - export option types
  - runtime validation
  - shared adapter to Apache ECharts options

- `@chart-platform/react-renderer`
  - React component renderer using `echarts-for-react`

- `@chart-platform/server-renderer`
  - backend SVG export
  - backend PNG export

There is also a demo application in `apps/demo` that showcases the current MVP.

## Repository structure


```bash
chart-platform-library/
├─ apps/
│  └─ demo/
│     ├─ src/
│     │  ├─ App.tsx
│     │  ├─ ValidationDemo.tsx
│     │  ├─ examples.ts
│     │  ├─ main.tsx
│     │  └─ styles.css
│     ├─ index.html
│     ├─ package.json
│     ├─ tsconfig.json
│     └─ vite.config.ts
├─ packages/
│  ├─ core/
│  │  ├─ src/
│  │  │  ├─ adapters/
│  │  │  │  └─ toEChartsOption.ts
│  │  │  ├─ export-options.ts
│  │  │  ├─ index.ts
│  │  │  ├─ types.ts
│  │  │  ├─ validation.ts
│  │  │  ├─ toEChartsOption.test.ts
│  │  │  └─ validation.test.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  ├─ react-renderer/
│  │  ├─ src/
│  │  │  ├─ ChartRenderer.tsx
│  │  │  └─ index.tsx
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ server-renderer/
│     ├─ src/
│     │  ├─ index.ts
│     │  ├─ render.test.ts
│     │  ├─ renderToPNG.ts
│     │  └─ renderToSVG.ts
│     ├─ package.json
│     └─ tsconfig.json
├─ docs/
│  └─ implementation-log.md
├─ README.md
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ tsconfig.json
└─ vitest.config.ts
```

## How it works

1. A developer creates a shared `ChartDefinition`.
2. The definition is validated by the shared core package.
3. The shared adapter converts the definition into an Apache ECharts option object.
4. On the frontend, the React renderer displays the chart as an interactive component.
5. On the backend, the server renderer generates either an SVG string or a PNG buffer from the same definition.

This shared pipeline is the central idea of the project: define once, render on multiple platforms.

## Installation

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

Run automated tests:

```bash
pnpm test
```

Main fields:

- `type`
- `title`
- `labels`
- `series`
- `xAxisLabel`
- `yAxisLabel`

### Pie charts

Used for:

- pie charts

Main fields:

- `type`
- `title`
- `data`

## Export options

Static backend export uses explicit export parameters:

- `width`
- `height`
- `background`

## Validation

The library includes shared runtime validation for:

- missing labels in bar and line charts
- missing series
- mismatched label and data lengths
- empty pie chart data
- invalid export width or height

Invalid input produces clear runtime errors instead of failing silently.

## Demo application

The demo currently showcases:

- bar chart — single series
- bar chart — multi series
- line chart — single series
- line chart — multi series
- pie chart
- validation error example

## Testing

The project currently includes smoke tests for:

- shared validation
- ECharts option generation
- SVG export
- PNG export

## Current status

The current implementation should be considered an MVP.

Implemented:

- shared chart model
- shared export options
- shared validation
- shared adapter layer
- React rendering
- backend SVG export
- backend PNG export
- demo showcase
- smoke tests
- more chart types
- more extensive automated tests

## Thesis context

This repository is the implementation part of the bachelor thesis:

**Multiplatformní open-source knihovna pro generování grafů v Reactu na klientu a jako obrázek na backendu**

The thesis focuses on the design and implementation of a shared chart library that can render interactive charts in React and generate static chart images on the backend from the same chart definition.

## License

This repository is currently part of an academic bachelor thesis project. License details can be added before public release.
