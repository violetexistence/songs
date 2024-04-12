import { TextField } from '@mui/material'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Person } from '../../api/types'
import { AddButton } from '../../components/button/AddButton'
import { CardBack } from '../../components/card/CardBack'
import { CardContainer } from '../../components/card/CardContainer'
import { useNavActions } from '../nav/useNavActions'
import { Front } from './CardFront'
import { chooseDefaultAvatar } from '../avatars/avatars'
import './people.css'
import { usePeople } from './usePeople'

function PeopleCardBack(person: Person) {
  const { update, remove } = usePeople()
  const avatar = person.avatar ?? chooseDefaultAvatar(person.id, 'people')
  return (
    <CardBack
      image={avatar}
      onDelete={() => remove(person.id)}
      onImageChange={(image) => {
        update({
          ...person,
          avatar: image,
        })
      }}
    />
  )
}

export function PeopleCards() {
  const { people, update, reorder, create } = usePeople()
  const [filter, setFilter] = useState('')

  const navActions = useMemo(
    () => <AddButton onClick={() => create({ name: 'New Person' })} />,
    [create]
  )

  useNavActions(navActions)

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

  const searchPredicate = useCallback(
    (person: Person) => {
      return person.name.toLowerCase().includes(filter?.toLowerCase())
    },
    [filter]
  )

  const filteredPeople = useMemo(
    () => people.filter(searchPredicate),
    [people, searchPredicate]
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
        cardBack={PeopleCardBack}
        onReorder={handleReorder}
      />
    </section>
  )
}
