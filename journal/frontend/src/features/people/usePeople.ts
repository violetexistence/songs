import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPeopleApi } from '../../api/people'
import { Person } from '../../api/types'
import { useLocalStorage } from '../storage/local'

const PEOPLE_QUERY_KEY = 'people'
const PEOPLE_SORT_STORAGE_KEY = 'journal.people.sort'
const api = getPeopleApi()

export function usePeople() {
  const [sortOrder, setSortOrder] = useLocalStorage<number[]>(
    PEOPLE_SORT_STORAGE_KEY,
    []
  )
  const queryClient = useQueryClient()
  const query = useQuery<Person[]>({
    queryKey: [PEOPLE_QUERY_KEY],
    queryFn: api.getPeople,
  })
  const createMutation = useMutation({
    mutationFn: api.createPerson,
    onSuccess: (result) => {
      queryClient.setQueryData([PEOPLE_QUERY_KEY], (old: Person[]) =>
        old.concat(result)
      )
    },
  })
  const deleteMutation = useMutation({
    mutationFn: api.deletePerson,
    onSuccess: (result, variables) => {
      queryClient.setQueryData([PEOPLE_QUERY_KEY], (old: Person[]) =>
        old.filter((p) => p.id != variables)
      )
    },
  })
  const updateMutation = useMutation({
    mutationFn: api.updatePerson,
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

function sortPeople(people: Person[], userSpecifiedSort: number[]) {
  const map = new Map(userSpecifiedSort.map((id, index) => [id, index]))
  const getSortableValue = (p: Person) => map.get(p.id) ?? people.length + p.id
  return people.toSorted((prev, next) => {
    return getSortableValue(prev) - getSortableValue(next)
  })
}
