import { describe, expect, it } from 'bun:test';
import { peopleController } from './people';

describe('People', () => {
  const api = peopleController;
  
  it('GET fetch all', async () => {
    const json = await api.handle(new Request('http://localhost/people')).then(res => res.json())
    
    expect(json).toBeArray()
  })

  it('POST creates', async () => {
    const person = await createNewPerson('test create')

    expect(person).not.toBeNull()
    expect(person.id).toBeNumber()
    expect(person.name).toBe('test create')

    await deletePerson(person.id)
  })

  it('DELETE removes existing person', async () => {
    const person = await createNewPerson('test delete')
    const response = await deletePerson(person.id)


    expect(response.status).toBe(204)
  })

  it('PUT updates existing person', async () => {
    const { id, ...theRest } = await createNewPerson('test update')
    const expected = {
      ...theRest,
      name: 'my new name'
    }
    const actual = await updatePerson(id, expected)

    expect(actual.id).toBe(id)
    expect(actual.name).toBe(expected.name)

    await deletePerson(id)
  })

  it('GET /:id fetches existing person', async () => {
    const expected = await createNewPerson('test get existing')
    const actual = await getPerson(expected.id)

    expect(actual.name).toBe(expected.name)

    await deletePerson(expected.id)
  })

  const createNewPerson = async (name: string) => {    
    return await api.handle(new Request('http://localhost/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })).then(res => res.json())
  }

  const updatePerson = async (id: number, data: any) => {
    return await api.handle(new Request(`http://localhost/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).then(res => res.json())
  }

  const getPerson = async (id: number) => {
    return await api.handle(new Request(`http://localhost/people/${id}`, {
      method: 'GET'
    })).then(res => res.json())
  }

  const deletePerson = async (id: number) => {
    return await api.handle(new Request(`http://localhost/people/${id}`, {
      method: 'DELETE'
    }))
  }
})