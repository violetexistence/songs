import FlipToBackIcon from '@mui/icons-material/FlipToBack'
import FlipToFrontIcon from '@mui/icons-material/FlipToFront'
import React, {
  CSSProperties,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react'
import ReactCardFlip from 'react-card-flip'
import { UniquelyIdentifiable } from '../../util/UniquelyIdentifiable'
import { PositionedButton } from '../button/PositionedButton'
import './Card.css'

export type CardProps = {
  item: UniquelyIdentifiable
  defaultSide?: 'front' | 'back'
  style?: CSSProperties
  children: [ReactNode, ReactNode]
}

export const Card = forwardRef<HTMLElement, CardProps>(
  (
    { children, defaultSide = 'back', ...props }: CardProps,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const [isFlipped, setFlipped] = useState(defaultSide === 'back')

    const handleFlipCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setFlipped((v) => !v)
      e.stopPropagation()
    }

    return (
      <article className="card" ref={ref} {...props}>
        <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
          {children}
        </ReactCardFlip>
        <PositionedButton corner="BottomLeft" onClick={handleFlipCardClick}>
          {isFlipped ? <FlipToFrontIcon /> : <FlipToBackIcon />}
        </PositionedButton>
      </article>
    )
  }
)
