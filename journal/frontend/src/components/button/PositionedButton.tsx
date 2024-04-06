import { IconButton } from "@mui/material";
import { MouseEvent, PropsWithChildren, useRef, useState } from "react";
import { useHover } from "../../hooks/useHover";

export type PositionedButtonProps = PropsWithChildren & {
  corner: Corner
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function PositionedButton({ className, onClick, corner, children }: PositionedButtonProps) {
  const [isHover, buttonRef] = useHover<HTMLButtonElement>()  
  const coords = cornerMap[corner]

  return (
    <IconButton className={className}
                onClick={onClick}
                ref={buttonRef}          
                style={{
                  opacity: isHover ? 1 : 0,
                  position: 'absolute',
                  ...coords
                }}>
      {children}
    </IconButton>
  )
}

type Coords = {
  top?: number,
  right?: number,
  bottom?: number,
  left?: number
}

type Corner = 'TopRight' | 'TopLeft' | 'BottomLeft' | 'BottomRight'

const cornerMap: Record<Corner, Coords> = {
  'TopLeft': { top: 0, left: 0 },
  'TopRight': { top: 0, right: 0 },
  'BottomRight': { bottom: 0, right: 0 },
  'BottomLeft': { bottom: 0, left: 0 }
}