import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/locations')({
  component: Locations
})

function Locations() {
  return (
    <>
      <h1>TODO: Implement Locations Page!</h1>
    </>
  )
}