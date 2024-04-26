import { TextField } from '@mui/material'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Person } from '../../api/types'
import { AddButton } from '../../components/button/AddButton'
import { CardBack } from '../../components/card/CardBack'
import { CardFront } from '../../components/card/CardFront'
import { CardContainer } from '../../components/card/CardContainer'
import { chooseDefaultAvatar } from '../avatars/avatars'
import { useNavActions } from '../nav/useNavActions'
import './people.css'
import { usePeople } from './usePeople'

function PersonCardBack({ item }: { item: Person }) {
  const { update, remove } = usePeople()

  const handleDelete = useCallback(() => {
    remove(item.id)
  }, [remove, item])

  const handleImageChange = useCallback(
    (image: string) => {
      update({
        ...item,
        avatar: image,
      })
    },
    [update, item]
  )

  const defaultAvatar = useMemo(() => {
    return (item.avatar = chooseDefaultAvatar(item.id, 'people'))
  }, [item])

  return (
    <CardBack
      image={item.avatar ?? defaultAvatar}
      name={item.name}
      onDelete={handleDelete}
      onImageChange={handleImageChange}
    />
  )
}

function PersonCardFront({ item }: { item: Person }) {
  const { update } = usePeople()

  const handleUpdate = useCallback(
    (updated: Person) => {
      update(updated)
    },
    [update]
  )

  return (
    <CardFront
      id={item.id}
      name={item.name}
      notes={item.notes ?? ''}
      onUpdate={handleUpdate}
    />
  )
}

export function PeopleCards() {
  const { people, reorder, create } = usePeople()
  const [filter, setFilter] = useState('')

  const navActions = useMemo(
    () => <AddButton onClick={() => create({ name: 'New Person' })} />,
    [create]
  )

  useNavActions(navActions)

  const handleReorder = (items: Person[]) => {
    reorder(items.map((i) => i.id))
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
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
        CardFrontComponent={PersonCardFront}
        CardBackComponent={PersonCardBack}
        onReorder={handleReorder}
      />
    </section>
  )
}
