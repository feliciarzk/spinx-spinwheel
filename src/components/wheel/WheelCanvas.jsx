const COLORS = ["#8B5CF6", "#6366F1", "#3B82F6", "#06B6D4", "#A855F7", "#F59E0B", "#EF4444", "#10B981"];
const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 4;

function polar(cx, cy, r, angle) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function WheelCanvas({ items }) {
  if (items.length === 0) {
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="#1E1B4B" />
        <text x={CENTER} y={CENTER} fill="white" fontSize="14" textAnchor="middle">
          Add items
        </text>
      </svg>
    );
  }

  const step = 360 / items.length;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {items.map((item, i) => {
        const start = i * step;
        const end = start + step;
        const mid = start + step / 2;
        const p1 = polar(CENTER, CENTER, RADIUS, start);
        const p2 = polar(CENTER, CENTER, RADIUS, end);
        const labelPos = polar(CENTER, CENTER, RADIUS * 0.62, mid);
        const largeArc = step > 180 ? 1 : 0;
        const path = `M ${CENTER} ${CENTER} L ${p1.x} ${p1.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;

        return (
          <g key={i}>
            <path d={path} fill={COLORS[i % COLORS.length]} stroke="#0B1020" strokeWidth="2" />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fill="white"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${mid}, ${labelPos.x}, ${labelPos.y})`}
            >
              {item.length > 10 ? item.slice(0, 9) + "…" : item}
            </text>
          </g>
        );
      })}
    </svg>
  );
}