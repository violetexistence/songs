import { TextField } from '@mui/material'
import { ChangeEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { CardContainer } from '../../components/card/CardContainer'
import { Back } from './CardBack'
import { Front } from './CardFront'
import './locations.css'
import { Location } from '../../api/locations'
import { useLocations } from './useLocations'
import { useNavActions } from '../nav/useNavActions'
import { AddButton } from '../../components/button/AddButton'

export function LocationCards() {  
  const { locations, update, reorder, create } = useLocations()
  const [ filter, setFilter ] = useState('')
  const { setNavActions: setActions } = useNavActions()

  const handleUpdate = (updated: Location) => {
    update(updated)
  }

  const handleReorder = (items: Location[]) => {
    reorder(items.map(i => i.id))
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

  const searchPredicate = (location: Location) => {
    return location.name.toLowerCase().includes(filter?.toLowerCase())
  }

  const filteredLocations = useMemo(
    () => locations.filter(searchPredicate), 
    [locations, filter]
  )

  useLayoutEffect(() => {
    setActions(<AddButton onClick={() => create({ name: 'New Location'})} />)
  },[])
  
  return (
    <section role='locations'>
      <section role='filters' style={{ marginBottom: '1em' }}>
        <TextField id='search' label='Search' defaultValue='' onChange={handleFilterChange} size='small' />
      </section>
      <CardContainer items={filteredLocations} 
                     cardFront={frontTemplate} 
                     cardBack={backTemplate}
                     onReorder={handleReorder} />
    </section>
  )
}