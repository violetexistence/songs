import { getFromStore, writeToStore } from '../features/storage/store'
import { Location } from './types'

const LOCATION_LOCAL_STORAGE_KEY = 'journal.location'
const seedLocation: Location[] = [
  {
    id: 1,
    name: 'New Location 1',
    notes: 'Notes for location 1',
  },
  {
    id: 2,
    name: 'New Location 2',
    notes: 'Notes for location 2',
  },
]

function getLocationFromLocalStore(): Location[] {
  return getFromStore(LOCATION_LOCAL_STORAGE_KEY, seedLocation) ?? []
}

function assignId(newLocation: Omit<Location, 'id'>): Location {
  return {
    id: new Date().getTime(),
    ...newLocation,
  }
}

function replaceLocationInLocalStore(locations: Location[]) {
  writeToStore(LOCATION_LOCAL_STORAGE_KEY, locations)
  return locations
}
export default {
  getLocations: () => {
    Promise.resolve(getLocationFromLocalStore())
  },
  createLocations: (location: Omit<Location, 'id'>) => {
    const newLocation = assignId(location)
    replaceLocationInLocalStore(getLocationFromLocalStore().concat(newLocation))
    return Promise.resolve(newLocation)
  },
  updateLocations: (location: Location) => {
    const all = getLocationFromLocalStore()
    const index = all.findIndex((p) => p.id === location.id)

    if (index > -1) {
      const existingLocation = all.at(index)
      const updatedPerson = { ...existingLocation, ...location }
      all[index] = updatedPerson
      replaceLocationInLocalStore(all)
      return Promise.resolve(updatedPerson)
    }
  },
  deleteLocations: (id: number) => {
    Promise.reject(new Error(`Not yet implemented ${id}.`))
  },
}
