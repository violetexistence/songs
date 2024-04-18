import { useRef, useState } from 'react'
import { EditableTitle } from '../../components/editable/EditableTitle'
import { Person } from '../../api/people'

export type FrontProps = Person & {
  onUpdate?: (updated: Person) => void
}

export function Front({
  id,
  name,
  notes: abstract,
  avatar,
  onUpdate,
}: FrontProps) {
  const [currentName, setCurrentName] = useState(name)
  const [currentAbstract, setCurrentAbstract] = useState(abstract)

  const nameRef = useRef<HTMLInputElement>(null)
  const abstractRef = useRef<HTMLTextAreaElement>(null)

  const handleCancelNameChange = () => {
    setCurrentName(name)
  }

  const handleCancelAbstractChange = () => {
    setCurrentAbstract(abstract)
  }

  const handleChange = () => {
    onUpdate &&
      onUpdate({
        id,
        avatar,
        name: currentName,
        notes: currentAbstract,
      })
  }

  return (
    <>
      <EditableTitle
        type="title"
        text={name}
        childRef={nameRef}
        onCancel={handleCancelNameChange}
        onSubmit={handleChange}
      >
        <input
          type="text"
          name="contact-name"
          ref={nameRef}
          placeholder="New contact name"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
      </EditableTitle>
      <EditableTitle
        type="markdown"
        text={abstract}
        childRef={abstractRef}
        onCancel={handleCancelAbstractChange}
        onSubmit={handleChange}
      >
        <textarea
          name="contact-abstract"
          ref={abstractRef}
          placeholder="Enter notes (markdown ok)"
          value={currentAbstract || ''}
          onChange={(e) => setCurrentAbstract(e.target.value)}
        >
          {abstract}
        </textarea>
      </EditableTitle>
    </>
  )
}
