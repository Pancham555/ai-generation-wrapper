"use client";

export default function HexagonalPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons"
            width="30"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(3) rotate(0)"
          >
            <path
              d="M15 0 L30 8.66 L30 23.14 L15 31.8 L0 23.14 L0 8.66 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
              className="text-primary"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.5;0.2"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />

        {/* Animated Hexagons */}
        {Array.from({ length: 40 }).map((_, i) => {
          const size = 10 + Math.random() * 20;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const duration = 15 + Math.random() * 30;
          const delay = Math.random() * -duration;
          const direction = Math.random() > 0.5 ? 1 : -1;
          const horizontalMove = Math.random() * 10 * direction;

          return (
            <g key={i}>
              <path
                d={`M${size / 2} 0 L${size} ${size * 0.288} L${size} ${
                  size * 0.772
                } L${size / 2} ${size * 1.06} L0 ${size * 0.772} L0 ${
                  size * 0.288
                } Z`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
                className="text-primary"
                transform={`translate(${x}%, ${y}%) scale(1.5)`}
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from={`${x}% ${y}%`}
                  to={`${x + horizontalMove}% ${y - 15}%`}
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.5;0"
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
