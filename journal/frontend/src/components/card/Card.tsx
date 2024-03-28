import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import { IconButton } from '@mui/material';
import React, { CSSProperties, ReactNode, forwardRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import './Card.css';

export type UniquelyIdentifiable = {
  id: string | number
}

export type CardProps = {
  item: UniquelyIdentifiable
  menu?: ReactNode
  defaultSide?: 'front' | 'back'
  style?: CSSProperties
  children: [ReactNode, ReactNode]
}

export const Card = forwardRef(({
  item, 
  menu,
  children, 
  defaultSide = 'back',
  ...props
}: CardProps, ref: any) => {
  const [isFlipped, setFlipped] = useState(defaultSide === 'back')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(v => !v)
    e.stopPropagation()
  }

  const handleFlipCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFlipped(v => !v)
    e.stopPropagation()
  }

  return (
    <article className='card' ref={ref} {...props}>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        {children}
      </ReactCardFlip>
      <IconButton className='flip-card-button' onClick={handleFlipCardClick}>
        {
          isFlipped ? <FlipToFrontIcon /> : <FlipToBackIcon />
        }
      </IconButton>
      { menuOpen && 
          <menu onClick={e => e.stopPropagation()}>
            {menu}
          </menu>
      }
      {
        menu &&
          <IconButton className='toggle-menu-button' onClick={handleToggleMenuClick}>
            { menuOpen ? <CloseIcon /> : <MenuOpenIcon /> }
          </IconButton>
      }
    </article>
  ) 
})