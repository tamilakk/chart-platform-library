import { validateChartDefinition } from "@chart-platform/core";
import type { ChartDefinition } from "@chart-platform/core";

// Example of invalid input used to demonstrate validation.
const invalidChart: ChartDefinition = {
  type: "bar",
  title: "Invalid Example",
  labels: ["Jan", "Feb", "Mar"],
  series: [
    {
      id: "broken-series",
      label: "Broken series",
      data: [12, 19]
    }
  ]
};

/**
 * Renders a demo of runtime validation for invalid chart input.
 *
 * @returns Demo section showing the validation error message.
 */
export function ValidationDemo() {
  let errorMessage = "No validation error.";

  try {
    validateChartDefinition(invalidChart);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unknown validation error.";
  }

  return (
    <article className="chart-card chart-card--wide">
      <h2>Validation example</h2>
      <p className="validation-text">
        This example intentionally uses invalid input data to demonstrate runtime
        validation of the shared chart definition.
      </p>
      <pre className="validation-error">{errorMessage}</pre>
    </article>
  );
}