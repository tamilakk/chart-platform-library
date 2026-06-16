import type { ChartDefinition, ChartTheme, ExportOptions, ThemeName } from "@chart-platform/core";
import { renderToSVG } from "./renderToSVG";

export interface ChartServerImageProps {
  /** Chart definition — the same object you pass to ChartRenderer on the client. */
  definition: ChartDefinition;
  /** Output width in pixels. Defaults to 800. */
  width?: number;
  /** Output height in pixels. Defaults to 400. */
  height?: number;
  /** Built-in theme name or a custom ChartTheme object. Defaults to the light theme. */
  theme?: ChartTheme | ThemeName;
  /** Background colour override. Takes priority over the theme background. */
  background?: string;
  /** Accessible label for the chart. Defaults to the chart title when omitted. */
  "aria-label"?: string;
}

/**
 * Async React Server Component that renders a chart as an inline SVG.
 *
 * Use this in server environments such as Next.js App Router (RSC).
 * The component accepts the same {@link ChartDefinition} and {@link ChartTheme} props
 * as {@link ChartRenderer} so you can share one definition across both contexts:
 *
 * ```tsx
 * // Client (react-renderer)
 * <ChartRenderer definition={myChart} theme="dark" />
 *
 * // Server (server-renderer)
 * <ChartServerImage definition={myChart} theme="dark" />
 * ```
 *
 * @param props Chart rendering options.
 * @returns React element with the rendered inline SVG.
 */
export async function ChartServerImage({
  definition,
  width = 800,
  height = 400,
  theme,
  background,
  "aria-label": ariaLabel
}: ChartServerImageProps): Promise<JSX.Element> {
  const exportOptions: ExportOptions = {
    width,
    height,
    ...(background ? { background } : {})
  };

  const svg = await renderToSVG(definition, exportOptions, theme);

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? definition.title}
      style={{ width: "100%", maxWidth: width }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
