import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@chart-platform/core": resolve(rootDir, "packages/core/src/index.ts"),
      "@chart-platform/react-renderer": resolve(
        rootDir,
        "packages/react-renderer/src/index.ts"
      ),
      "@chart-platform/server-renderer": resolve(
        rootDir,
        "packages/server-renderer/src/index.ts"
      )
    }
  },
  test: {
    include: ["packages/**/*.test.{ts,tsx}"],
    exclude: ["**/dist/**", "**/node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["packages/**/*.{ts,tsx}"],
      exclude: [
        "packages/**/*.test.{ts,tsx}",
        "packages/**/dist/**",
        "packages/**/index.{ts,tsx}",
        "packages/**/types.ts",
        "packages/**/export-options.ts",
        "packages/core/src/examples.ts",
        "packages/server-renderer/src/dev-test.ts",
        "packages/**/*.d.ts"
      ],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 90,
        statements: 95
      }
    }
  }
});