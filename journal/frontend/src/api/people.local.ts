import { getFromStore, writeToStore } from '../features/storage/store'
import { Person } from './types'

const PEOPLE_LOCAL_STORAGE_KEY = 'journal.people'

const seedPeople: Person[] = [
  {
    id: 1,
    name: 'New Person 1',
    notes: 'Notes for new person 1',
  },
  {
    id: 2,
    name: 'New Person 2',
    notes: 'Notes for new person 2',
  },
]

function getPeopleFromLocalStore(): Person[] {
  return getFromStore(PEOPLE_LOCAL_STORAGE_KEY, seedPeople) ?? []
}

function replacePeopleInLocalStore(people: Person[]) {
  writeToStore(PEOPLE_LOCAL_STORAGE_KEY, people)
  return people
}

function assignId(almostPerson: Omit<Person, 'id'>): Person {
  return {
    id: new Date().getTime(),
    ...almostPerson,
  }
}

export default {
  getPeople: () => Promise.resolve(getPeopleFromLocalStore()),

  createPerson: (person: Omit<Person, 'id'>) => {
    const newPerson = assignId(person)
    replacePeopleInLocalStore(getPeopleFromLocalStore().concat(newPerson))
    return Promise.resolve(newPerson)
  },

  deletePerson: (id: number) => {
    replacePeopleInLocalStore(
      getPeopleFromLocalStore().filter((p) => p.id !== id)
    )
    return Promise.resolve()
  },

  updatePerson: (person: Person) => {
    const all = getPeopleFromLocalStore()
    const index = all.findIndex((p) => p.id === person.id)

    if (index > -1) {
      const existingPerson = all.at(index)
      const updatedPerson = { ...existingPerson, ...person }
      all[index] = updatedPerson
      replacePeopleInLocalStore(all)
      return Promise.resolve(updatedPerson)
    }

    return Promise.reject(new Error(`Cannot find person with id: ${person.id}`))
  },
}
