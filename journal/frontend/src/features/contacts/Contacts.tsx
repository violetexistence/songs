import { Button, ButtonGroup } from '@mui/material'
import avatar1 from '../../assets/avatar1.jpg'
import avatar10 from '../../assets/avatar10.png'
import avatar11 from '../../assets/avatar11.png'
import avatar12 from '../../assets/avatar12.png'
import avatar13 from '../../assets/avatar13.png'
import avatar5 from '../../assets/avatar5.png'
import avatar6 from '../../assets/avatar6.png'
import avatar7 from '../../assets/avatar7.png'
import avatar8 from '../../assets/avatar8.png'
import avatar9 from '../../assets/avatar9.png'
import { ConfirmedDeleteButton } from '../../components/button/ConfirmedDeleteButton'
import { CardItem } from "../../components/card/Card"
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './Back'
import { Contact, useContacts } from './Contact'
import './Contacts.css'
import { Front } from './Front'
import { usePeople } from './Query'

const avatars = [
  avatar1,
  avatar5, 
  avatar6, 
  avatar7, 
  avatar8, 
  avatar9, 
  avatar10,
  avatar11,
  avatar12,
  avatar13
]

function fromContact(contact: Contact): CardItem {
  return {
    id: contact.id,
    imageUrl: avatars[contact.id % avatars.length],
    data: contact
  }
}

export function Contacts() {
  const { people, remove, update } = usePeople()
  const { saveAll } = useContacts()
  
  const cardItems = people.map(fromContact)

  const handleDelete = (id: number) => {
    remove(id)
  }

  const handleUpdate = (updated: Contact) => {
    update(updated)
  }

  const handleReorder = (items: CardItem[]) => {
    saveAll(items.map(i => i.data))
  }

  const contactTemplate = (item: CardItem) => {
    return <Front {...item.data} onDelete={handleDelete} onUpdate={handleUpdate} />
  }

  const backTemplate = (item: CardItem) => {
    return <Back contact={item.data} />
  }

  const menuTemplate = (item: CardItem) => {
    return (
      <ButtonGroup variant='contained' orientation='vertical'>
        <ConfirmedDeleteButton onDelete={() => handleDelete(item.data.id)} />
        <Button>Set Image</Button>
      </ButtonGroup>
    )
  }
  
  return (
      <CardContainer items={cardItems} 
                     cardFront={contactTemplate} 
                     cardBack={backTemplate} 
                     cardMenu={menuTemplate}
                     onReorder={handleReorder} />
  )
}