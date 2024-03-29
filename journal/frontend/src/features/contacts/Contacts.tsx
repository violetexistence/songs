import { Button, ButtonGroup } from '@mui/material'
import { ConfirmedDeleteButton } from '../../components/button/ConfirmedDeleteButton'
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './Back'
import './Contacts.css'
import { Front } from './Front'
import { usePeople } from './Query'
import { Person } from './api'
import { SetImageButton } from '../../components/button/SetImageButton'

export function Contacts() {
  const { people, remove, update, reorder } = usePeople()
  
  const handleDelete = (id: number) => {
    remove(id)
  }

  const handleUpdate = (updated: Person) => {
    update(updated)
  }

  const handleReorder = (items: Person[]) => {
    reorder(items.map(i => i.id))
  }

  const handleImageSet = (person: Person, image: string) => {
    update({
      ...person,
      avatar: image
    })
  }

  const contactTemplate = (item: Person) => {
    return <Front {...item} onDelete={handleDelete} onUpdate={handleUpdate} />
  }

  const backTemplate = (item: Person) => {
    return <Back person={item} />
  }

  const menuTemplate = (item: Person) => {
    return (
      <ButtonGroup variant='contained' orientation='vertical'>
        <ConfirmedDeleteButton onDelete={() => handleDelete(item.id)} />
        <SetImageButton onImageSet={image => handleImageSet(item, image)} />
      </ButtonGroup>
    )
  }
  
  return (
      <CardContainer items={people} 
                     cardFront={contactTemplate} 
                     cardBack={backTemplate} 
                     cardMenu={menuTemplate}
                     onReorder={handleReorder} />
  )
}