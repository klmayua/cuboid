export function CuboidLogo({ variant = 'full', width = 32, height = 32, className = '', mode = 'light' }: { variant?: 'mark' | 'full', width?: number, height?: number, className?: string, mode?: string }) {
  const variants: Record<string, React.ReactNode> = {
    mark: <svg width={width} height={height} viewBox="0 0 32 32" fill="none" className={className}>
      <rect x="4" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="12" y="8" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>,
    full: <svg width={width} height={height} viewBox="0 0 80 80" fill="none" className={className}>
      <rect x="10" y="20" width="40" height="40" rx="4" stroke="#5E8DFF" strokeWidth="2" fill="none"/>
      <rect x="30" y="20" width="40" height="40" rx="4" stroke="#123E91" strokeWidth="2" fill="none"/>
    </svg>,
  };
  
  return <>{variants[variant || 'full']}</>;
}