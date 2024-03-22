import { ReactNode, useState } from "react";
import ReactCardFlip from "react-card-flip";
import './Card.css'

type CardProps = {
  children: ReactNode | ReactNode[] | null
  defaultSide?: Side
  disableFlip?: boolean
  imageUrl?: string
  onClick?: () => void
}

export type Side = 'front' | 'back'

export function Card({children, defaultSide = 'back', disableFlip = false, imageUrl, onClick}: CardProps) {
  const [isFlipped, setFlipped] = useState(defaultSide === 'back');

  const handleClick = () => {
    if (!disableFlip) {
      setFlipped(v => !v)
    }
    onClick && onClick()
  }

  function InitialUpside() {
    switch(defaultSide) {
      case 'back':
        return <CardBack imgUrl={ imageUrl } />
      case 'front':
        return <CardFront>{ children }</CardFront>
    }
  }

  return (
      <article className='card' onClick={handleClick} draggable onDragStart={() => console.log('Drag Start')}>
        { !disableFlip ? 
          <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
            <CardFront>{ children }</CardFront>
            <CardBack imgUrl={ imageUrl } />
          </ReactCardFlip>
        : 
          <InitialUpside />
        }
      </article>
  )
}

export function CardContainer({children}: {children: ReactNode[]}) {
  return (
    <section className='card-container'>
      { children }
    </section>  
  )
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
  imgUrl?: string
}

function CardBack({ imgUrl }: CardBackProps) {
  return (
    <div className='back' style={{ backgroundImage:`url(${ imgUrl })` }}>
      <img src={ imgUrl } alt='avatar' style={{ visibility: 'hidden' }} />
    </div>
  )
}