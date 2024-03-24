import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { CSSProperties, ReactNode, forwardRef, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Pastable, usePastable } from '../../features/images/usePastable';
import hamburger from '../../assets/hamburger.svg'
import './Card.css';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type UniquelyIdentifiable = {
  id: string | number
}

export type CardItem = UniquelyIdentifiable & {
  imageUrl: string,
  data: any
}

export type CardProps = {
  item: CardItem
  children: ReactNode | ReactNode[] | null
  defaultSide?: Side
  disableFlip?: boolean
  imageUrl?: string
  style?: CSSProperties
}

export type Side = 'front' | 'back'

export function SortableCard<T>({
  item,
  children, 
  ...props
}: CardProps ) {
  const sortable = useSortable({id: item.id})

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition
  }

  return (
      <Card item={item} 
            ref={sortable.setNodeRef} 
            style={style} 
            {...sortable.attributes} 
            {...sortable.listeners} 
            {...props}>
        {children}
      </Card>
  )
}

export const Card = forwardRef(({
  item, 
  children, 
  defaultSide = 'back', 
  disableFlip = false,
  ...props
}: CardProps, ref: any) => {
  const [isFlipped, setFlipped] = useState(defaultSide === 'back')
  const [src, handlePaste] = usePastable(item.imageUrl)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleClick = () => {
    if (!disableFlip) {
      setFlipped(v => !v)
    }
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuOpen(v => !v)
    e.stopPropagation()
  }

  function front() {
    return <CardFront>{ children }</CardFront>
  }

  function back() {
    return <CardBack imgUrl={ src } />
  }

  const sides = new Map<Side, ReactNode>([
    ['front', front()],
    ['back', back()]
  ])

  return (
    <article className='card'
             tabIndex={1}
             ref={ref}            
             {...props}    
             onClick={handleClick}
             onPaste={handlePaste}>
      { !disableFlip ? 
        <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
          {sides.get('front')}
          {sides.get('back')}
        </ReactCardFlip>
      : 
        sides.get(defaultSide)
      }
      <button className='menu-button' onClick={handleMenuClick}>
        <img src={hamburger} alt='menu' />
      </button>
      { menuOpen && 
        <menu onClick={e => e.stopPropagation()}>
          <ButtonGroup variant='contained' orientation='vertical'>
            <ConfirmedDeleteButton />
            <Button>Set Image</Button>
          </ButtonGroup>
          <IconButton className='close-button' aria-label='Close Menu'>
            <CloseIcon color='action' />
          </IconButton>
        </menu>      
      }
    </article>
  ) 
})

function ConfirmedDeleteButton() {
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div className='confirm-buttons'>
        <ButtonGroup aria-label='Confirm or Cancel'>
          <Button color='error'>Confirm</Button>
          <Button color='success'>Cancel</Button>
        </ButtonGroup>
      </div>
    )
  } else {
    return <Button>Delete</Button>
  }
}

type CardFrontProps = { 
  children: ReactNode | ReactNode[] | null
}

function CardFront({ children }: CardFrontProps) {
  return (
    <div className='front'>
      { children }
    </div>
  )
}

type CardBackProps = {
  imgUrl?: Pastable
}

function CardBack({ imgUrl }: CardBackProps) {
  return (
    <div className='back' style={{ backgroundImage:`url(${ imgUrl })` }} />
  )
}