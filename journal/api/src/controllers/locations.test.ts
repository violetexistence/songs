import { describe, expect, it } from 'bun:test';
import { locationsController } from './locations';

describe('Locations', () => {
    const api = locationsController;
    const name = 'test create';

    it('GET: should get all locations', async () => {
        const response = await api.handle(new Request('http://localhost/locations')).then(res => res.json());

        expect(response).toBeArray()
    });

    it('POST: should create a new location', async () => {
        const actual = await createNewLocation(name); 

        expect(actual.id).toBeNumber;
        expect(actual.name).toBe(name);

        const response = await deleteLocation(actual.id);
        expect(response.status).toBe(204);
    });

    it('DELETE: should delete a location', async () => {
        const location = await createNewLocation(name);
        const response = await api.handle(new Request(`http://localhost/locations/${location.id}`, {
            method: 'DELETE'
        }));

        expect(response.status).toBe(204);
    });

    it('PUT: should update a location', async () => {

        const {id, ...theRest}  = await createNewLocation(name);
        const expected = {
            ...theRest,
            name: 'my new name'
        }
        const actual = await updateLocation(id, expected);

        expect(actual.id).toBe(id);
        expect(actual.name).toBe(expected.name);

        const response = await deleteLocation(actual.id);
        expect(response.status).toBe(204);
    });

    it('GET /:id:should get a location by ID', async () => {
        const expected = await createNewLocation(name);
        const actual = await getPerson(expected.id);

        expect(actual.id).toBe(expected.id);
        expect(actual.name).toBe(expected.name);

        const response = await deleteLocation(actual.id);
        expect(response.status).toBe(204);
    });

    const createNewLocation = async (name: string) => {
        return await api.handle(new Request('http://localhost/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })).then(res => res.json())
    }

    const updateLocation = async (id: number, data: any) => {
        return await api.handle(new Request(`http://localhost/locations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })).then(res => res.json())
    }

        const getPerson = async (id: number) => {     
            return await api.handle(new Request(`http://localhost/locations/${id}`, {
                method: 'GET'
            })).then(res => res.json())
        }   

        const deleteLocation = async (id: number) => {
            return await api.handle(new Request(`http://localhost/locations/${id}`, {
                method: 'DELETE'
            }));
        }
    });
