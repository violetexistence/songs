import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLocationApi } from '../../api/locations'
import { Location } from '../../api/types'
import { useLocalStorage } from '../storage/local'

const LOCATIONS_QUERY_KEY = 'locations'
const LOCATIONS_SORT_STORAGE_KEY = 'journal.locations.sort'
const api = getLocationApi()

export function useLocations() {
  const [sortOrder, setSortOrder] = useLocalStorage<number[]>(
    LOCATIONS_SORT_STORAGE_KEY,
    []
  )
  const queryClient = useQueryClient()
  const query = useQuery<Location[]>({
    queryKey: [LOCATIONS_QUERY_KEY],
    queryFn: api.getLocations,
  })
  const createMutation = useMutation({
    mutationFn: api.createLocation,
    onSuccess: (result) => {
      queryClient.setQueryData([LOCATIONS_QUERY_KEY], (old: Location[]) =>
        old.concat(result)
      )
    },
  })
  const deleteMutation = useMutation({
    mutationFn: api.deleteLocation,
    onSuccess: (result, variables) => {
      queryClient.setQueryData([LOCATIONS_QUERY_KEY], (old: Location[]) =>
        old.filter((p) => p.id != variables)
      )
    },
  })
  const updateMutation = useMutation({
    mutationFn: api.updateLocation,
    onSuccess: (result, variables) => {
      queryClient.setQueryData([LOCATIONS_QUERY_KEY], (old: Location[]) =>
        old.map((p) => (p.id === variables.id ? { ...variables } : p))
      )
    },
  })

  const sortedLocations = sortLocations(query.data || [], sortOrder)

  return {
    locations: sortedLocations,
    create: createMutation.mutate,
    remove: deleteMutation.mutate,
    update: updateMutation.mutate,
    reorder: setSortOrder,
  }

  function sortLocations(locations: Location[], userSpecifiedSort: number[]) {
    const map = new Map(userSpecifiedSort.map((id, index) => [id, index]))
    const getSortableValue = (p: Location) =>
      map.get(p.id) ?? locations.length + p.id
    return locations.toSorted((prev, next) => {
      return getSortableValue(prev) - getSortableValue(next)
    })
  }
}
