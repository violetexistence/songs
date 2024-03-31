import { Person } from '../../api/people'
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './CardBack'
import { Front } from './CardFront'
import './people.css'
import { usePeople } from './usePeople'

export function Contacts() {
  const { people, update, reorder } = usePeople()

  const handleUpdate = (updated: Person) => {
    update(updated)
  }

  const handleReorder = (items: Person[]) => {
    reorder(items.map(i => i.id))
  }

  const frontTemplate = (item: Person) => {
    return <Front {...item} onUpdate={handleUpdate} />
  }

  const backTemplate = (item: Person) => {
    return <Back person={item} />
  }
  
  return (
      <CardContainer items={people} 
                     cardFront={frontTemplate} 
                     cardBack={backTemplate}
                     onReorder={handleReorder} />
  )
}