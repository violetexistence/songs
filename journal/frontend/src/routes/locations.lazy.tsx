import { createLazyFileRoute } from '@tanstack/react-router'
import { LocationCards } from '../features/locations/LocationCards'

export const Route = createLazyFileRoute('/locations')({
  component: Locations
})

function Locations() {
  return (
    <LocationCards/>
  )
}