import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { IconButton } from '@mui/material';
import React, { CSSProperties, ReactNode, forwardRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { UniquelyIdentifiable } from '../../util/UniquelyIdentifiable';
import './Card.css';
import { PositionedButton } from '../button/PositionedButton';

export type CardProps = {
  item: UniquelyIdentifiable
  defaultSide?: 'front' | 'back'
  style?: CSSProperties
  children: [ReactNode, ReactNode]
}

export const Card = forwardRef(({
  item,
  children, 
  defaultSide = 'back',
  ...props
}: CardProps, ref: any) => {
  const [isFlipped, setFlipped] = useState(defaultSide === 'back')

  const handleFlipCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFlipped(v => !v)
    e.stopPropagation()
  }

  return (
    <article className='card' ref={ref} {...props}>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        {children}
      </ReactCardFlip>
      <PositionedButton position='BottomLeft' onClick={handleFlipCardClick}>
        {
          isFlipped ? <FlipToFrontIcon /> : <FlipToBackIcon />
        }
      </PositionedButton>
    </article>
  ) 
})