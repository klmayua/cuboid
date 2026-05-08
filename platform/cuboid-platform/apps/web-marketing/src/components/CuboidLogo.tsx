export function CuboidLogo({ width = 40, height = 40, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="8" width="20" height="20" rx="2" stroke="#1D9BF0" strokeWidth="1.5" fill="none" />
      <rect x="16" y="12" width="20" height="20" rx="2" stroke="#1D9BF0" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <rect x="10" y="4" width="20" height="20" rx="2" stroke="#1D9BF0" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
    </svg>
  );
}