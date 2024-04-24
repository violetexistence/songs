import axios from 'axios'
import localStore from './locations.local'
import { Location } from './types'

const ENV: 'local' | 'remote' = import.meta.env.VITE_DATA_STORE ?? 'local'
const LOCATIONS_URL = `${import.meta.env.VITE_API_LOCATION || 'http://localhost:3333'}/locations`

const url = (id?: number) => {
  return id ? `${LOCATIONS_URL}/${id}` : LOCATIONS_URL
}

interface LocationApi {
  getLocations: () => Promise<Location[]>
  createLocation: (location: Omit<Location, 'id'>) => Promise<Location>
  deleteLocation: (id: number) => Promise<void>
  updateLocation: (location: Location) => Promise<Location>
}

const remoteStore: LocationApi = {
  getLocations: () => {
    return axios.get(url()).then((res) => res.data)
  },
  createLocation: (location) => {
    return axios.post(url(), location).then((res) => res.data)
  },
  deleteLocation: (id: number) => {
    return axios.delete(url(id))
  },
  updateLocation: (location) => {
    const { id, ...other } = location
    return axios.put(url(id), other).then((res) => res.data)
  }
}
export function getLocationApi(): LocationApi {
  if(ENV === 'local'){
    localStore.getLocations();
    return remoteStore
  }
  return remoteStore
}
