import React, { ReactNode, useEffect, useState } from "react";

export type EditableTitleProps = {
  children: ReactNode | ReactNode[],
  text?: string,
  placeholder?: string,
  childRef?: React.RefObject<HTMLInputElement>,
  onSubmit?: () => void,
  onCancel?: () => void
}

export function EditableTitle({
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
    setEditing(v => !v)
    event.stopPropagation()
  }

  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <section {...props} onClick={handleClick}>
      { isEditing ? (
        <div onBlur={handleBlur} onKeyDown={handleKeyDown}>
          {children}
        </div>
      ) : (
        <div>
          <h4>{ text || placeholder }</h4>
        </div>
      )}
    </section>
  )
}