import axios from 'axios'
import { Person } from './types'
import localStore from './people.local'

const ENV: 'local' | 'remote' = import.meta.env.VITE_DATA_STORE ?? 'local'
const PEOPLE_URL = `${import.meta.env.VITE_API_LOCATION || 'http://localhost:3333'}/people`

const url = (id?: number) => {
  return id ? `${PEOPLE_URL}/${id}` : PEOPLE_URL
}

interface PeopleApi {
  getPeople: () => Promise<Person[]>
  createPerson: (person: Omit<Person, 'id'>) => Promise<Person>
  deletePerson: (id: number) => Promise<void>
  updatePerson: (person: Person) => Promise<Person>
}

const remoteStore: PeopleApi = {
  getPeople: () => {
    return axios.get(url()).then((res) => res.data)
  },
  createPerson: (person) => {
    return axios.post(url(), person).then((res) => res.data)
  },
  deletePerson: (id) => {
    return axios.delete(url(id))
  },
  updatePerson: (person) => {
    const { id, ...other } = person
    return axios.put(url(id), other).then((res) => res.data)
  },
}

export function getPeopleApi(): PeopleApi {
  if (ENV === 'local') {
    localStore.getPeople()
    return remoteStore
  }
  return remoteStore
}
