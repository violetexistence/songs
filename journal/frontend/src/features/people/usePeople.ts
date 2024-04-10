import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Person,
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from '../../api/people'
import { useLocalStorage } from '../storage/local'

const PEOPLE_QUERY_KEY = 'people'
const PEOPLE_SORT_STORAGE_KEY = 'journal.people.sort'

export function usePeople() {
  const [sortOrder, setSortOrder] = useLocalStorage<Number[]>(
    PEOPLE_SORT_STORAGE_KEY,
    []
  )
  const queryClient = useQueryClient()
  const query = useQuery<Person[]>({
    queryKey: [PEOPLE_QUERY_KEY],
    queryFn: getPeople,
  })
  const createMutation = useMutation({
    mutationFn: createPerson,
    onSuccess: (result) => {
      queryClient.setQueryData([PEOPLE_QUERY_KEY], (old: Person[]) =>
        old.concat(result)
      )
    },
  })
  const deleteMutation = useMutation({
    mutationFn: deletePerson,
    onSuccess: (result, variables) => {
      queryClient.setQueryData([PEOPLE_QUERY_KEY], (old: Person[]) =>
        old.filter((p) => p.id != variables)
      )
    },
  })
  const updateMutation = useMutation({
    mutationFn: updatePerson,
    onSuccess: (result, variables) => {
      queryClient.setQueryData([PEOPLE_QUERY_KEY], (old: Person[]) =>
        old.map((p) => (p.id === variables.id ? { ...variables } : p))
      )
    },
  })

  const sortedPeople = sortPeople(query.data || [], sortOrder)

  return {
    people: sortedPeople,
    create: createMutation.mutate,
    remove: deleteMutation.mutate,
    update: updateMutation.mutate,
    reorder: setSortOrder,
  }
}

function sortPeople(people: Person[], userSpecifiedSort: Number[]) {
  const map = new Map(userSpecifiedSort.map((id, index) => [id, index]))
  const getSortableValue = (p: Person) => map.get(p.id) ?? people.length + p.id
  return people.toSorted((prev, next) => {
    return getSortableValue(prev) - getSortableValue(next)
  })
}
