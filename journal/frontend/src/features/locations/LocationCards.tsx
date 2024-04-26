import { TextField } from '@mui/material'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Location } from '../../api/types'
import { AddButton } from '../../components/button/AddButton'
import { CardBack } from '../../components/card/CardBack'
import { CardFront } from '../../components/card/CardFront'
import { CardContainer } from '../../components/card/CardContainer'
import { useNavActions } from '../nav/useNavActions'
import defaultAvatar from '../../assets/maps/DragonAgeWorld.jpg'
import { useLocations } from './useLocations'
import './locations.css'
import { UniquelyIdentifiable } from '../../util/UniquelyIdentifiable'

function LocationCardBack({ item }: { item: Location }) {
  const { update, remove } = useLocations()

  const handleDelete = useCallback(() => {
    remove(item.id)
  }, [remove, item])

  const handleImageChange = useCallback(
    (image: string) => {
      update({
        ...item,
        image: image,
      })
    },
    [update, item]
  )

  return (
    <CardBack
      image={item.image ?? defaultAvatar}
      name={item.name}
      onDelete={handleDelete}
      onImageChange={handleImageChange}
    />
  )
}

function LocationCardFront({ item }: { item: Location }) {
  const { update } = useLocations()
  const handleUpdate = useCallback(
    (updated: Location) => {
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

export function LocationCards() {
  const { locations, reorder, create } = useLocations()
  const [filter, setFilter] = useState('')

  const navActions = useMemo(
    () => <AddButton onClick={() => create({ name: 'New Location' })} />,
    [create]
  )

  useNavActions(navActions)

  const handleReorder = (items: Location[]) => {
    reorder(items.map((i) => i.id))
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const searchPredicate = useCallback(
    (location: Location) => {
      return location.name.toLowerCase().includes(filter?.toLowerCase())
    },
    [filter]
  )

  const filteredLocations = useMemo(
    () => locations.filter(searchPredicate),
    [locations, searchPredicate]
  )

  return (
    <section role="locations">
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
        items={filteredLocations}
        CardFrontComponent={({ item }: { item: UniquelyIdentifiable }) => (
          <LocationCardFront item={item as Location} />
        )}
        CardBackComponent={({ item }: { item: Location }) => (
          <LocationCardBack item={item} />
        )} // Update the type of cardBack prop
        onReorder={handleReorder as (items: UniquelyIdentifiable[]) => void} // Cast handleReorder to accept UniquelyIdentifiable[]
      />
    </section>
  )
}
