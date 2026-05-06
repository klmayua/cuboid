import type { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'full' | 'mark' | 'wordmark';
  mode?: 'light' | 'dark';
}

export function CuboidLogo({ variant = 'full', mode = 'dark', ...props }: LogoProps) {
  const fillColor = mode === 'light' ? '#F5F8FF' : '#0A2A66';
  const accentColor = '#5E8DFF';

  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M24 4L40 14V34L24 44L8 34V14L24 4Z"
          stroke={fillColor}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 4L24 44"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <path
          d="M8 14L40 14"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <path
          d="M8 34L40 34"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
        <path
          d="M24 4L8 14L8 34L24 44L40 34L40 14L24 4Z"
          stroke={accentColor}
          strokeWidth="0.5"
          fill={accentColor}
          fillOpacity="0.1"
        />
      </svg>
    );
  }

  if (variant === 'wordmark') {
    return (
      <svg viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M16 4L28 10V22L16 28L4 22V10L16 4Z"
          stroke={fillColor}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 4V28"
          stroke={fillColor}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M4 10L28 10"
          stroke={fillColor}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M4 22L28 22"
          stroke={fillColor}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M38 8H48C49.1046 8 50 8.89543 50 10V10C50 11.1046 49.1046 12 48 12H38V8Z"
          fill={fillColor}
        />
        <path
          d="M50 14H38V18H50V14Z"
          fill={fillColor}
        />
        <path
          d="M52 20H60C61.1046 20 62 20.8954 62 22V22C62 23.1046 61.1046 24 60 24H52V20Z"
          fill={fillColor}
        />
        <path
          d="M64 20H72V24H64V20Z"
          fill={fillColor}
        />
        <path
          d="M64 14H76C77.1046 14 78 14.8954 78 16V16C78 17.1046 77.1046 18 76 18H64V14Z"
          fill={fillColor}
        />
        <path
          d="M64 8H80C81.1046 8 82 8.89543 82 10V10C82 11.1046 81.1046 12 80 12H64V8Z"
          fill={fillColor}
        />
        <path
          d="M84 20H92C93.1046 20 94 20.8954 94 22V22C94 23.1046 93.1046 24 92 24H84V20Z"
          fill={fillColor}
        />
        <path
          d="M64 24H96V26H64V24Z"
          fill={fillColor}
          fillOpacity="0.6"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M24 6L40 14V34L24 42L8 34V14L24 6Z"
        stroke={fillColor}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M24 6V42"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M8 14L40 14"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M8 34L40 34"
        stroke={fillColor}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M24 6L8 14L8 34L24 42L40 34L40 14L24 6Z"
        stroke={accentColor}
        strokeWidth="0.5"
        fill={accentColor}
        fillOpacity="0.1"
      />
      <text
        x="50"
        y="30"
        fontFamily="Inter Tight, system-ui, sans-serif"
        fontSize="20"
        fontWeight="600"
        fill={fillColor}
      >
        CUBOID
      </text>
    </svg>
  );
}

export default CuboidLogo;