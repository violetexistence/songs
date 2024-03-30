import { ButtonGroup } from '@mui/material'
import { ConfirmedDeleteButton } from '../../components/button/ConfirmedDeleteButton'
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './Back'
import './Contacts.css'
import { Front } from './Front'
import { usePeople } from './Query'
import { Person } from './api'

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