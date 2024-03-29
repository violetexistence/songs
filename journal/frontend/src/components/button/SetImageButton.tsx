import { Button } from "@mui/material";
import { ClipboardEvent, DragEvent, MouseEvent, useEffect, useRef, useState } from "react";
import './SetImageButton.css';

export type SetImageButtonProps = {
  onImageSet: (image: string) => void
}

export function SetImageButton({onImageSet}: SetImageButtonProps) {
  const [isActive, setActive] = useState(false)
  const [isOver, setOver] = useState(false)
  const dropTargetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dropTargetRef.current?.focus()
  })

  const handleButtonClick = () => {
    setActive(true)
  }

  const handleCancelClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setActive(false)
    e.preventDefault()
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    if (!e.clipboardData) return

    if (e.clipboardData?.items) {
      processItems([...e.clipboardData.items])
    } else {
      processFiles([...e.clipboardData?.files])
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items) {
      processItems([...e.dataTransfer.items])
    } else {
      processFiles([...e.dataTransfer.files])
    }
    setOver(false)
    e.preventDefault()
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    setOver(true)
    e.preventDefault()
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setOver(false)
  }

  const setImage = (image: string) => {
    setActive(false)
    onImageSet(image)
  }

  const processItems = (items: DataTransferItem[]) => {
    items.forEach(i => {
      switch(i.type) {
        case 'text/html':
          i.getAsString(processHtml)
          break
        case 'text/url-list':
          i.getAsString(processUrlList)
          break
        default:
          console.log('Cannot process type: ' + i.type)
      }
    })
  }

  const processHtml = (html: string) => {
    const container = document.createElement('div')
    container.innerHTML = html
    
    const image = container.querySelector('img')
    image && setImage(image.src)
  }

  const processUrlList = (list: string) => {
    const lines = list.split(/\r?\n|\r|\n/g)
    const urls = lines.filter(l => l && !l.startsWith('#'))
    urls.length > 0 && setImage(urls[0])
  }

  const processFiles = (files: File[]) => {
    const image = files.filter(f => f.type.includes('image')).at(0)
    if (image) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result as string)
      })
      reader.readAsDataURL(image)     
    }
  }

  return isActive ? (
    <div tabIndex={1} className={`drop-zone ${isOver ? 'over' : ''}`} onPaste={handlePaste} ref={dropTargetRef} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <p>
        Drag/Paste Image or <a href="#" target='' onClick={handleCancelClick}>Cancel</a>
      </p>
    </div>
  ) : (
    <Button onClick={handleButtonClick}>Set Image</Button>   
  )
}