import Markdown from 'react-markdown'
import './EditableTitle.css'
import React, { ReactNode, useEffect, useState } from 'react'

export type EditableTitleProps = {
  children: ReactNode | ReactNode[]
  type: 'title' | 'markdown'
  text?: string
  placeholder?: string
  childRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  onSubmit?: () => void
  onCancel?: () => void
}

export function EditableTitle({
  type,
  text,
  placeholder = 'Editable content',
  childRef,
  children,
  onSubmit,
  onCancel,
  ...props
}: EditableTitleProps) {
  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    if (isEditing && childRef && childRef.current) {
      childRef.current.focus()
      childRef.current.select()
    }
    isEditing && childRef && childRef.current?.focus()
  }, [isEditing, childRef])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event
    const changeKeys = ['Enter', 'Tab']
    const cancelKeys = ['Escape']
    const allKeys = [...changeKeys, ...cancelKeys]

    changeKeys.includes(key) && onSubmit && onSubmit()
    cancelKeys.includes(key) && onCancel && onCancel()
    allKeys.includes(key) && setEditing(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing) {
      setEditing(true)
    }
    event.stopPropagation()
  }

  const handleBlur = () => {
    onCancel && onCancel()
    setEditing(false)
  }

  return (
    <section className="editable-title" {...props} onClick={handleClick}>
      {isEditing ? (
        <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
          {children}
        </div>
      ) : (
        <div>
          {type === 'title' ? (
            <h4>{text || placeholder}</h4>
          ) : (
            <Markdown>{text || placeholder}</Markdown>
          )}
        </div>
      )}
    </section>
  )
}
