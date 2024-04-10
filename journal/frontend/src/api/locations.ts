import axios from 'axios'

const LOCATIONS_URL = `${import.meta.env.VITE_API_LOCATION || 'http://localhost:3000'}/locations`

const url = (id?: number) => {
  return id ? `${LOCATIONS_URL}/${id}` : LOCATIONS_URL
}

export type Location = {
  id: number
  name: string
  notes?: string
  image?: string
}

export function getLocations() {
  return axios.get(url()).then((res) => res.data)
}

export function createLocation(
  location: Omit<Location, 'id'>
): Promise<Location> {
  return axios.post(url(), location).then((res) => res.data)
}

export function deleteLocation(id: number) {
  return axios.delete(url(id))
}

export function updateLocation(location: Location) {
  const { id, ...other } = location
  return axios.put(url(id), other).then((res) => res.data)
}
