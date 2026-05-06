# Chart Platform Library

Multiplatform library for defining a chart once and rendering it in two ways:

- as an interactive React component on the client,
- as a static SVG or PNG image on the backend.

This repository is the implementation part of the bachelor thesis focused on reducing duplication between frontend chart rendering and backend export through a shared chart definition.

## Current functionality

The project currently provides:

- shared chart definition in `@chart-platform/core`,
- runtime validation of input data,
- transformation of chart definitions to Apache ECharts options,
- React renderer in `@chart-platform/react-renderer`,
- backend SVG and PNG export in `@chart-platform/server-renderer`,
- demo application showing supported chart types,
- automated tests and CI pipeline.

## How it works

1. A developer creates a shared `ChartDefinition`.
2. The definition is validated by the shared core package.
3. The shared adapter converts the definition into an Apache ECharts option object.
4. On the frontend, the React renderer displays the chart as an interactive component.
5. On the backend, the server renderer generates either an SVG string or a PNG buffer from the same definition.

This shared pipeline is the central idea of the project: define once, render on multiple platforms.

## Supported chart types

The current implementation includes:

- bar chart,
- line chart,
- pie chart,
- scatter chart,
- radar chart,
- gauge chart,
- funnel chart,
- raw Apache ECharts configuration.

## Project structure

- `packages/core` – shared types, validation and ECharts adapter
- `packages/react-renderer` – React chart renderer
- `packages/server-renderer` – backend SVG/PNG export
- `apps/demo` – demo application
- `docs` – supplementary implementation notes

## Technologies

The project is implemented as a pnpm monorepo using:

- TypeScript
- React
- Apache ECharts
- Vite
- Vitest
- Sharp

## Requirements

- Node.js 22 or newer
- pnpm 10 or newer

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

Run tests:
```bash
pnpm test
```

Run tests with coverage:

```bash
pnpm test:coverage
```

Build all packages and the demo:

```bash
pnpm build
```
Run the frontend demo:

```bash
pnpm --filter demo dev --force
```

Run the backend rendering demo:

```bash
pnpm demo:server
```
Run the basic verification pipeline locally:

```bash
pnpm check
```

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

## Testing

The current test suite covers:

- shared chart definitions and type-level constraints,
- runtime validation of chart input data,
- transformation of shared chart definitions into Apache ECharts options,
- React chart rendering,
- backend SVG export,
- backend PNG export.

## Current status

The project is currently in a functional MVP state.

It implements a shared chart definition that can be used for both frontend and backend rendering. On the client side, charts can be rendered as interactive React components. On the backend, the same input can be exported as static SVG and PNG images.

The repository includes a working demo application, automated tests, code coverage reporting, and a CI pipeline for build and test verification. The current implementation already demonstrates the main architectural idea of the thesis: defining a chart once and reusing it across multiple output environments.

## Thesis context

This repository is the implementation part of the bachelor thesis:

**Multiplatformní open-source knihovna pro generování grafů v Reactu na klientu a jako obrázek na backendu**

The thesis focuses on the design and implementation of a shared chart library that can render interactive charts in React and generate static chart images on the backend from the same chart definition.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
