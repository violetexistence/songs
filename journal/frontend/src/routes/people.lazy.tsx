import { createLazyFileRoute } from '@tanstack/react-router'
import { PeopleCards } from '../features/people/PeopleCards'

export const Route = createLazyFileRoute('/people')({
  component: People,
})

function People() {
  return <PeopleCards />
}
