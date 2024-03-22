import React, { useRef, useState } from "react";
import { Card } from "../../components/card/Card";
import { EditableTitle } from "../../components/editable/EditableTitle";

export type Contact = {
  id: number
  name: string
  abstract?: string
  avatar?: string
}

export type ContactCardProps = Contact & {
  onDelete?: (id: number) => void
  onUpdate?: (updated: Contact) => void
}

export function ContactCard({id, name, abstract, avatar, onDelete, onUpdate}: ContactCardProps) {
  const [currentName, setCurrentName] = useState(name);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDelete && onDelete(id)
    e.stopPropagation()
  }

  const handleCancelNameChange = () => {
    setCurrentName(name)
  }

  const handleNameChange = () => {
    onUpdate && onUpdate({
      id, abstract, avatar,
      name: currentName
    })
  }

  return (
    <Card imageUrl={avatar}>
      <EditableTitle text={name} childRef={nameRef} onCancel={handleCancelNameChange} onSubmit={handleNameChange}>
        <input type='text'                 
               name='contact-name' 
               ref={nameRef}
               placeholder='New contact name' 
               value={currentName} 
               onChange={e => setCurrentName(e.target.value)} />
      </EditableTitle>
      <p>{abstract}</p>
      <button onClick={handleDeleteClick}>delete</button>
    </Card>
  )
}