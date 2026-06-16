export type ThemeName = "light" | "dark" | "minimal";

/**
 * Visual theme configuration for chart rendering.
 * All fields are optional — unset fields fall back to the light theme defaults.
 */
export interface ChartTheme {
  colors?: string[];
  backgroundColor?: string;
  textColor?: string;
  axisColor?: string;
  fontFamily?: string;
}

/** Built-in light theme — white background, blue-toned palette. */
export const lightTheme: ChartTheme = {
  colors: [
    "#4f8ef7",
    "#34d399",
    "#f59e0b",
    "#f87171",
    "#a78bfa",
    "#22d3ee",
    "#fb923c",
    "#a3e635"
  ],
  backgroundColor: "#ffffff",
  textColor: "#374151",
  axisColor: "#d1d5db",
  fontFamily: "system-ui, sans-serif"
};

/** Built-in dark theme — dark background, vibrant palette. */
export const darkTheme: ChartTheme = {
  colors: [
    "#4f8ef7",
    "#34d399",
    "#fbbf24",
    "#f87171",
    "#a78bfa",
    "#22d3ee",
    "#fb923c",
    "#a3e635"
  ],
  backgroundColor: "#1e2030",
  textColor: "#e2e8f0",
  axisColor: "#374151",
  fontFamily: "system-ui, sans-serif"
};

/** Built-in minimal theme — white background, monochrome palette. */
export const minimalTheme: ChartTheme = {
  colors: [
    "#1e293b",
    "#475569",
    "#94a3b8",
    "#64748b",
    "#334155",
    "#cbd5e1",
    "#0f172a",
    "#e2e8f0"
  ],
  backgroundColor: "#ffffff",
  textColor: "#1e293b",
  axisColor: "#e2e8f0",
  fontFamily: "system-ui, sans-serif"
};

const builtInThemes: Record<ThemeName, ChartTheme> = {
  light: lightTheme,
  dark: darkTheme,
  minimal: minimalTheme
};

/**
 * Resolves a theme name or custom theme object into a full ChartTheme.
 * Custom theme objects are merged on top of the light theme defaults.
 *
 * @param theme Theme name or partial theme object. Defaults to light when omitted.
 * @returns Resolved ChartTheme with all fields populated.
 */
export function resolveTheme(theme?: ChartTheme | ThemeName): ChartTheme {
  if (!theme) return lightTheme;
  if (typeof theme === "string") return builtInThemes[theme] ?? lightTheme;
  return { ...lightTheme, ...theme };
}
