import type { CartesianChartDefinition } from "@chart-platform/core";

type BarChartProps = {
  definition: CartesianChartDefinition;
};

export function BarChart({ definition }: BarChartProps) {
  const width = definition.width ?? 800;
  const height = definition.height ?? 400;

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const data = definition.series[0]?.data ?? [];
  const maxValue = Math.max(...data, 1);
  const barCount = data.length;
  const gap = 16;
  const barWidth =
    barCount > 0 ? (chartWidth - gap * (barCount - 1)) / barCount : 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="white" />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={padding + chartHeight}
        stroke="black"
      />
      <line
        x1={padding}
        y1={padding + chartHeight}
        x2={padding + chartWidth}
        y2={padding + chartHeight}
        stroke="black"
      />

      {data.map((value, index) => {
        const barHeight = (value / maxValue) * (chartHeight - 20);
        const x = padding + index * (barWidth + gap);
        const y = padding + chartHeight - barHeight;

        return (
          <g key={index}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#2563eb" />
            <text
              x={x + barWidth / 2}
              y={padding + chartHeight + 18}
              textAnchor="middle"
              fontSize="12"
            >
              {definition.labels[index]}
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize="12"
            >
              {value}
            </text>
          </g>
        );
      })}

      {definition.title && (
        <text x={width / 2} y={24} textAnchor="middle" fontSize="18" fontWeight="600">
          {definition.title}
        </text>
      )}
    </svg>
  );
}