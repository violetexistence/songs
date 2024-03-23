import './ContactCard.css'
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
  const [currentName, setCurrentName] = useState(name)
  const [currentAbstract, setCurrentAbstract] = useState(abstract)
  const nameRef = useRef<HTMLInputElement>(null)
  const abstractRef = useRef<HTMLTextAreaElement>(null)

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDelete && onDelete(id)
    e.stopPropagation()
  }

  const handleCancelNameChange = () => {
    setCurrentName(name)
  }

  const handleCancelAbstractChange = () => {
    setCurrentAbstract(abstract)
  }

  const handleChange = () => {
    onUpdate && onUpdate({
      id, avatar,
      name: currentName,
      abstract: currentAbstract
    })
  }

  return (
    <Card imageUrl={avatar}>
      <EditableTitle type='title'
                     text={name} 
                     childRef={nameRef} 
                     onCancel={handleCancelNameChange} 
                     onSubmit={handleChange}>
        <input type='text'                 
               name='contact-name' 
               ref={nameRef}
               placeholder='New contact name' 
               value={currentName} 
               onChange={e => setCurrentName(e.target.value)} />
      </EditableTitle>
      <EditableTitle type='markdown'
                     text={abstract}
                     childRef={abstractRef}
                     onCancel={handleCancelAbstractChange}
                     onSubmit={handleChange}>
        <textarea name='contact-abstract' 
                  ref={abstractRef}
                  placeholder='Enter notes (markdown ok)'
                  value={currentAbstract}
                  onChange={e => setCurrentAbstract(e.target.value)}>
          {abstract}
        </textarea>
      </EditableTitle>
      <button onClick={handleDeleteClick}>delete</button>
    </Card>
  )
}