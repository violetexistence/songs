import { useState } from "react"

export type Pastable = string | ArrayBuffer | undefined | null

export function usePastable(initialSrc: Pastable): [Pastable, (e: React.ClipboardEvent) => void] {
  const [src, setSrc] = useState(initialSrc)
  
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = (e.clipboardData || e.nativeEvent.clipboardData).items;
    
    let blob: File | null = null
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
        blob = items[i].getAsFile()
        break
      }
    }

    if (blob) {
      const reader = new FileReader()
      reader.onload = (progress: ProgressEvent<FileReader>) => {
        setSrc(progress.target?.result)
      }
      reader.readAsDataURL(blob)
    }
  }

  return [src, handlePaste]
}