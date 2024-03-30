import { IconButton } from "@mui/material";
import { MouseEvent, PropsWithChildren, useState } from "react";

export type PositionedButtonProps = PropsWithChildren & {
  position: 'TopRight' | 'TopLeft' | 'BottomLeft' | 'BottomRight'
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function PositionedButton({ className, onClick, position, children }: PositionedButtonProps) {
  const [isHover, setHover] = useState(false)
  const coords: { top?: number, left?: number, right?: number, bottom?: number  } = {}
  position.startsWith('Top') && (coords.top = 0)
  position.startsWith('Bottom') && (coords.bottom = 0)
  position.endsWith('Right') && (coords.right = 0)
  position.startsWith('Left') && (coords.left = 0)

  return (
    <IconButton className={className} 
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)} 
                onClick={onClick}                
                style={{
                  position: 'absolute',
                  ...coords,
                  opacity: isHover ? 1 : 0
                }}>
      {children}
    </IconButton>
  )
}