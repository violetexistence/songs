import axios from "axios"

export type Person = {
  id: number,
  name: string,
  notes?: string,
  avatar?: string
}

const API_URL = 'http://localhost:3333'
const PEOPLE_URI = `${API_URL}/people`

const PERSON_URI = (id: number) => {
  return `${PEOPLE_URI}/${id}`
}

export function getPeople() {
  return axios.get(PEOPLE_URI).then(res => res.data)
}

export function createPerson(person: Omit<Person, 'id'>) {
  return axios.post(PEOPLE_URI, person).then(res => res.data)
}

export function deletePerson(id: number) {
  return axios.delete(PERSON_URI(id))
}

export function updatePerson(person: Person) {  
  const {id, ...other} = person;
  return axios.put(PERSON_URI(id), other).then(res => res.data)
}