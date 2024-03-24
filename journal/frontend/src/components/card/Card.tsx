import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { ButtonPropsVariantOverrides, IconButton } from '@mui/material';
import React, { CSSProperties, ReactNode, forwardRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import './Card.css';

export type UniquelyIdentifiable = {
  id: string | number
}

export type CardItem = UniquelyIdentifiable & {
  imageUrl: string,
  data: any
}

export type CardProps = {
  item: CardItem
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

  const handleClick = () => {
    setFlipped(v => !v)
  }

  const handleToggleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(v => !v)
    e.stopPropagation()
  }

  return (
    <article className='card' ref={ref} onClick={handleClick} {...props}>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
        {children}
      </ReactCardFlip>
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