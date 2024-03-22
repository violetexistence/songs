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
import plus from '../../assets/plus.svg'
import { Card, CardContainer } from "../../components/card/Card"
import { useLocalStorage } from "../storage/local"
import { Contact, ContactCard } from './ContactCard'

const initialContacts: Contact[] = [];

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

export function Contacts() {
  const [contacts, writeContacts] = useLocalStorage('journal-contacts', initialContacts)
  const handleNewContactClick = () => {
    const newContact = {
      id: new Date().getTime(),
      name: 'New Card',
      abstract: 'Lorem ipsum dolor sit amet.'
    }
    writeContacts(contacts?.concat(newContact) || [newContact])
  }

  const handleDelete = (id: number) => {
    writeContacts(prev => prev?.filter(c => c.id !== id) || [])
  }

  if (!(contacts?.map instanceof Function)) {
    console.log(`What is map? ${contacts}`)
  }
  
  return (
    <CardContainer>
      <NewContactCard onClick={handleNewContactClick} />      
      {contacts && contacts.map && contacts.map(c => {
        const avatar = avatars[Number(c.id) % avatars.length]
        return <ContactCard key={c.id} {...c} avatar={avatar} onDelete={handleDelete} />
      })}
    </CardContainer>
  )
}

function NewContactCard({ onClick }: { onClick: () => void }) {
  return (
    <Card defaultSide='front' disableFlip onClick={onClick}>
      <img src={plus} alt='New Contact' />
    </Card>
  )
}