import { describe, expect, it } from 'bun:test';
import { peopleController } from '../src/people.controller';

describe('People API', () => {
  const api = peopleController;
  
  it('fetches a list of people', async () => {
    const json = await api.handle(new Request('http://localhost/people')).then(res => res.json())
    
    expect(json).toBeArray()
  })

  it('can create a new person', async () => {
    const person = await createNewPerson('test create')

    expect(person).not.toBeNull()
    expect(person.id).toBeNumber()
    expect(person.name).toBe('test create')
  })

  it('can delete an existing person', async () => {
    const person = await createNewPerson('test delete')
    const response = await api.handle(new Request(`http://localhost/people/${person.id}`, {
      method: 'DELETE'
    }))

    expect(response.status).toBe(204)
  })

  it('can update an existing person', async () => {
    const { id, ...theRest } = await createNewPerson('test update')
    const expected = {
      ...theRest,
      name: 'my new name'
    }
    const actual = await updatePerson(id, expected)

    expect(actual.id).toBe(id)
    expect(actual.name).toBe(expected.name)
  })

  it('can get an existing person', async () => {
    const expected = await createNewPerson('test get existing')
    const actual = await getPerson(expected.id)

    expect(actual.name).toBe(expected.name)
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
})