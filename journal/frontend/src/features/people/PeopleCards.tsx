import { TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Person } from '../../api/people'
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './CardBack'
import { Front } from './CardFront'
import './people.css'
import { usePeople } from './usePeople'

export function PeopleCards() {
  const { people, update, reorder } = usePeople()
  const [ filter, setFilter ] = useState('')

  const handleUpdate = (updated: Person) => {
    update(updated)
  }

  const handleReorder = (items: Person[]) => {
    reorder(items.map(i => i.id))
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const frontTemplate = (item: Person) => {
    return <Front {...item} onUpdate={handleUpdate} />
  }

  const backTemplate = (item: Person) => {
    return <Back person={item} />
  }
  
  return (
    <section role='people'>
      <section role='filters' style={{ marginBottom: '1em' }}>
        <TextField id='search' label='Search' defaultValue='' onChange={handleFilterChange} size='small' />
      </section>
      <CardContainer items={people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))} 
                     cardFront={frontTemplate} 
                     cardBack={backTemplate}
                     onReorder={handleReorder} />
    </section>
  )
}