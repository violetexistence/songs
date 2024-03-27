import { Elysia, t } from "elysia";
import { PeopleDatabase } from './people.db';
import { Person, identityParams, personCreationData, personType } from './people.model';

export const peopleController = new Elysia()
  .decorate('db', new PeopleDatabase())

  ///
  /// GET all people
  ///
  .get('/people', ({ db }) => {
    return db.getPeople()
  },{
    response: t.Array(personType)
  })

  ///
  /// CREATE a new person
  ///
  .post('/people', ({ db, body }) => {
    return db.addPerson(body)
  },{
    body: personCreationData,
    response: personType
  })

  ///
  /// DELETE a person
  ///
  .delete('/people/:id', async ({ db, params: { id }, set }) => {
    await db.deletePerson(id)
    set.status = 'No Content'
  },{
    params: identityParams
  })

  ///
  /// UPDATE a person
  ///
  .put('/people/:id', async ({ db, params: { id }, body }) => {
    const person: Person = {
      id,
      name: body.name,
      notes: body.notes,
      avatar: body.avatar
    }
    await db.updatePerson(person)
    return person
  },{
    body: personCreationData,
    params: identityParams,
    response: personType
  })

  ///
  /// GET a person by id
  ///
  .get('/people/:id', ({ db, params: { id } }) => {
    return db.getPerson(id)
  },{
    params: identityParams
  })