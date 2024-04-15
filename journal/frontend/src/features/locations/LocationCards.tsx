import { TextField } from '@mui/material'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Location } from '../../api/locations'
import { AddButton } from '../../components/button/AddButton'
import { CardContainer } from '../../components/card/CardContainer'
import { useNavActions } from '../nav/useNavActions'
import { Back } from './CardBack'
import { Front } from './CardFront'
import './locations.css'
import { useLocations } from './useLocations'

export function LocationCards() {
  const { locations, update, reorder, create } = useLocations()
  const [filter, setFilter] = useState('')

  const navActions = useMemo(
    () => <AddButton onClick={() => create({ name: 'New Location' })} />,
    [create]
  )

  useNavActions(navActions)

  const handleUpdate = (updated: Location) => {
    update(updated)
  }

  const handleReorder = (items: Location[]) => {
    reorder(items.map((i) => i.id))
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const frontTemplate = (item: Location) => {
    return <Front {...item} onUpdate={handleUpdate} />
  }

  const backTemplate = (item: Location) => {
    return <Back location={item} />
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
        CardFrontComponent={frontTemplate}
        cardBack={backTemplate}
        onReorder={handleReorder}
      />
    </section>
  )
}
