import axios from "axios"

const PEOPLE_URL = `${import.meta.env.VITE_API_LOCATION}/people`
console.log(PEOPLE_URL)
const url = (id?: number) => {
  return id ? `${PEOPLE_URL}/${id}` : PEOPLE_URL
}

export type Person = {
  id: number,
  name: string,
  notes?: string,
  avatar?: string
}

export function getPeople() {
  return axios.get(url()).then(res => res.data)
}

export function createPerson(person: Omit<Person, 'id'>): Promise<Person> {
  return axios.post(url(), person).then(res => res.data)
}

export function deletePerson(id: number) {
  return axios.delete(url(id))
}

export function updatePerson(person: Person) {  
  const {id, ...other} = person;
  return axios.put(url(id), other).then(res => res.data)
}