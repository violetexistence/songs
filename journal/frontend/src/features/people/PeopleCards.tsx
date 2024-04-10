import { TextField } from '@mui/material'
import { ChangeEvent, useMemo, useState } from 'react'
import { Person } from '../../api/people'
import { AddButton } from '../../components/button/AddButton'
import { CardContainer } from '../../components/card/CardContainer'
import { useNavActions } from '../nav/useNavActions'
import { Back } from './CardBack'
import { Front } from './CardFront'
import './people.css'
import { usePeople } from './usePeople'

export function PeopleCards() {
  const { people, update, reorder, create } = usePeople()
  const [filter, setFilter] = useState('')

  useNavActions(<AddButton onClick={() => create({ name: 'New Person' })} />)

  const handleUpdate = (updated: Person) => {
    update(updated)
  }

  const handleReorder = (items: Person[]) => {
    reorder(items.map((i) => i.id))
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

  const searchPredicate = (person: Person) => {
    return person.name.toLowerCase().includes(filter?.toLowerCase())
  }

  const filteredPeople = useMemo(
    () => people.filter(searchPredicate),
    [people, filter]
  )

  return (
    <section role="people">
      <section role="filters" style={{ marginBottom: '1em' }}>
        <TextField
          id="search"
          label="Search"
          defaultValue=""
          onChange={handleFilterChange}
          size="small"
        />
      </section>
      <CardContainer
        items={filteredPeople}
        cardFront={frontTemplate}
        cardBack={backTemplate}
        onReorder={handleReorder}
      />
    </section>
  )
}
