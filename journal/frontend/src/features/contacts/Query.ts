import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PEOPLE_QUERY_KEY = 'people'

export type Person = {
  id: number,
  name: string,
  notes?: string,
  avatar?: string
}

export function usePeople() {
  const queryClient = useQueryClient()
  const query = useQuery<Person[]>({ queryKey: [PEOPLE_QUERY_KEY], queryFn: getPeople })  
  const createMutation = useMutation({
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEOPLE_QUERY_KEY] })
    }
  })
  const deleteMutation = useMutation({
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEOPLE_QUERY_KEY] })
    }
  })
  const updateMutation = useMutation({
    mutationFn: updatePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PEOPLE_QUERY_KEY] })
    }
  })

  return {
    people: query.data || [],
    create: createMutation.mutate,
    remove: deleteMutation.mutate,
    update: updateMutation.mutate
  }
}

function getPeople() {
  return fetch('http://localhost:3031/people').then(res => res.json())
}

function createPerson(person: Omit<Person, 'id'>) {
  return fetch('http://localhost:3031/people', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(person)
  })
}

function deletePerson(id: number) {
  return fetch('http://localhost:3031/people/' + id, {
    method: 'DELETE'
  })
}

function updatePerson(person: Person) {
  const {id, ...other} = person;
  return fetch('http://localhost:3031/people/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...other
    })
  })
}