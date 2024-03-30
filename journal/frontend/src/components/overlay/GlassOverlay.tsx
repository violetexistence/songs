import { CSSProperties, PropsWithChildren } from "react"

export type GlassOverlapProps = PropsWithChildren & {
  className?: string
  style?: CSSProperties
}

export function GlassOverlay({ children, className, style }: GlassOverlapProps) {
  return (
    <div className={ className } style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 16,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }}>
      { children }
    </div>
  )
}