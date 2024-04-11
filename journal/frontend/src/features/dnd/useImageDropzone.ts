import {
  ClipboardEvent,
  DragEvent,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'

export type useImageDropzoneProps = {
  onDrop?: (imageUrl: string) => void
}

export function useImageDropzone<TRoot extends HTMLElement>({
  onDrop,
}: useImageDropzoneProps) {
  const [isZoneActive, setZoneActive] = useState(false)
  const [isSelected, setSelected] = useState(false)
  const rootRef = useRef<TRoot>(null)

  useEffect(() => {
    if (isSelected) {
      rootRef.current?.focus()
    }
  })

  const handlePaste = (e: ClipboardEvent<TRoot>) => {
    if (!e.clipboardData) return

    if (e.clipboardData?.items) {
      processItems([...e.clipboardData.items])
      return
    }

    if (e.clipboardData?.files) {
      processFiles([...e.clipboardData.files])
      return
    }
  }

  const handleDrop = (e: DragEvent<TRoot>) => {
    if (e.dataTransfer.items) {
      processItems([...e.dataTransfer.items])
    } else {
      processFiles([...e.dataTransfer.files])
    }
    setZoneActive(false)
    e.preventDefault()
  }

  const handleDragOver = (e: DragEvent<TRoot>) => {
    setZoneActive(true)
    e.preventDefault()
  }

  const handleDragLeave = () => {
    setZoneActive(false)
  }

  const handleClick = () => {
    setSelected(true)
  }

  const handleBlur = () => {
    setSelected(false)
  }

  const setImage = (image: string) => {
    onDrop && onDrop(image)
    setZoneActive(false)
  }

  const getRootProps = (): HTMLAttributes<TRoot> => {
    return {
      tabIndex: 1,
      onClick: handleClick,
      onBlur: handleBlur,
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onPaste: handlePaste,
    }
  }

  const processItems = (items: DataTransferItem[]) => {
    items.forEach((i) => {
      switch (i.type) {
        case 'text/html':
          i.getAsString(processHtml)
          break
        case 'text/uri-list':
          i.getAsString(processUrlList)
          break
        default:
          if (i.type.startsWith('image')) {
            const file = i.getAsFile()
            file && processFiles([file])
          } else {
            // TODO: add proper logging console.log('Cannot process type: ' + i.type)
          }
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
    const urls = lines.filter((l) => l && !l.startsWith('#'))
    const last = urls.pop()
    last && setImage(last)
  }

  const processFiles = (files: File[]) => {
    const image = files.filter((f) => f.type.includes('image')).at(0)
    if (image) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result as string)
      })
      reader.readAsDataURL(image)
    }
  }

  return {
    getRootProps,
    isZoneActive,
  }
}
