import React, { useState } from 'react';
import type { ExposureDayData } from '@/types/analytics';

interface ScreenExposureChartProps {
  data?: ExposureDayData[];
  targetHours?: number;
}

const DEFAULT_DAYS: ExposureDayData[] = [
  { day: 'Mon', hours: 4.1, targetHours: 4.5 },
  { day: 'Tue', hours: 3.9, targetHours: 4.5 },
  { day: 'Wed', hours: 4.0, targetHours: 4.5 },
  { day: 'Thu', hours: 3.5, targetHours: 4.5 },
  { day: 'Fri', hours: 3.2, targetHours: 4.5 },
  { day: 'Sat', hours: 3.8, targetHours: 4.5 },
  { day: 'Sun', hours: 2.9, targetHours: 4.5 },
];

export const ScreenExposureChart: React.FC<ScreenExposureChartProps> = ({
  data = DEFAULT_DAYS,
  targetHours = 4.5,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Chart coordinates mapping (viewBox 0 0 700 200)
  // X coordinates: 40, 140, 240, 340, 440, 540, 640
  // Y coordinates: max hours ~5.0 -> y=20; 0h -> y=190
  const getX = (index: number) => 40 + index * 100;
  const getY = (hours: number) => {
    // 5.0h = 35, 0h = 190
    const clamped = Math.max(0, Math.min(5.5, hours));
    return 190 - (clamped / 5.5) * 155;
  };

  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.hours),
    ...d,
  }));

  const pathD = points.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );

  const areaD = `${pathD} L ${points[points.length - 1].x},190 L ${points[0].x},190 Z`;
  const targetY = getY(targetHours);

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm md:text-base font-medium text-on-surface">
            Daily Screen Exposure vs Target
          </h3>
          <p className="text-xs text-outline">Target threshold: 4h 30m maximum per 24h cycle</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-on-surface-variant dark:text-outline">
            <span className="w-3 h-1 bg-primary-container dark:bg-primary-fixed-dim rounded"></span>
            Actual Usage
          </span>
          <span className="flex items-center gap-1.5 text-on-surface-variant dark:text-outline">
            <span className="w-3 h-0.5 border-t border-dashed border-outline"></span>
            Target ({targetHours}h)
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative h-60 w-full pt-2">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 700 200"
          preserveAspectRatio="none"
          role="img"
          aria-label="Daily screen exposure versus target graph"
        >
          <defs>
            <linearGradient id="sageAreaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2d5a4c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2d5a4c" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="20"
            y1="120"
            x2="680"
            y2="120"
            stroke="#c0c8c3"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1="20"
            y1="180"
            x2="680"
            y2="180"
            stroke="#c0c8c3"
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* Target Dashed Line */}
          <line
            x1="20"
            y1={targetY}
            x2="680"
            y2={targetY}
            stroke="#717975"
            strokeWidth="1.2"
            strokeDasharray="4,4"
            opacity="0.6"
          />
          <text
            x="635"
            y={targetY - 7}
            fill="#717975"
            fontSize="11"
            fontFamily="Geist, sans-serif"
          >
            Target {targetHours}h
          </text>

          {/* Area Fill */}
          <path d={areaD} fill="url(#sageAreaGrad)" />

          {/* Main Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#2d5a4c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Data Points */}
          {points.map((pt, idx) => {
            const isLast = idx === points.length - 1;
            const isHovered = hoveredIndex === idx;

            return (
              <g key={pt.day} className="cursor-pointer">
                {/* Invisible larger hit target */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {/* Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : isLast ? 5 : 4}
                  fill={isLast || isHovered ? '#2d5a4c' : '#ffffff'}
                  stroke="#2d5a4c"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
                {/* Active Tooltip */}
                {isHovered && (
                  <g className="animate-fadeIn">
                    <rect
                      x={pt.x - 30}
                      y={pt.y - 32}
                      width="60"
                      height="22"
                      rx="4"
                      fill="#1a1c1e"
                      className="shadow-md"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 17}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontFamily="Geist, sans-serif"
                      fontWeight="500"
                    >
                      {pt.hours}h ({pt.day})
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Day Labels Underneath */}
        <div className="flex justify-between text-xs text-outline mt-3 px-2 sm:px-4">
          {points.map((pt, idx) => {
            const isLast = idx === points.length - 1;
            return (
              <span
                key={pt.day}
                className={
                  isLast
                    ? 'font-medium text-primary dark:text-inverse-primary'
                    : hoveredIndex === idx
                    ? 'text-on-surface font-medium'
                    : ''
                }
              >
                {pt.day} ({pt.hours}h)
              </span>
            );
          })}
        </div>
      </div>

      {/* Recovery Trend Note */}
      <div className="mt-6 pt-4 border-t border-outline-variant/30 dark:border-outline/20 flex flex-wrap items-center justify-between text-xs gap-2">
        <span className="text-on-surface-variant dark:text-outline">
          Weekly average: <strong className="text-on-surface">3h 42m</strong> (Down from 4h 32m 3 weeks ago).
        </span>
        <span className="text-secondary font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">trending_down</span>
          Calm progressive descent
        </span>
      </div>
    </div>
  );
};
