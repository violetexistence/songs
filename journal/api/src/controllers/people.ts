import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "../db";
import { createPersonSchema, people, personSchema } from "../db/schema";

const identityParams = t.Object({
  id: t.Numeric()
})

export const peopleController = new Elysia()
  .decorate('db', db)

  ///
  /// GET all people
  ///
  .get('/people', ({ db }) => {
    return db.select().from(people)
  },{
    response: t.Array(personSchema)
  })

  ///
  /// CREATE a new person
  ///
  .post('/people', ({ db, body }) => {
    return db.insert(people)
             .values(body)
             .returning()
             .then(rows => rows[0])
  },{
    body: createPersonSchema,
    response: personSchema
  })

  ///
  /// DELETE a person
  ///
  .delete('/people/:id', async ({ db, params: { id }, set }) => {
    const deleted = await db.delete(people)
                            .where(eq(people.id, id))
                            .returning()
    
    if (deleted.length === 0) {
      set.status = 'Not Found'
      return 'Cannot delete this person =('
    }

    set.status = 'No Content'
  },{
    params: identityParams
  })

  ///
  /// UPDATE a person
  ///
  .put('/people/:id', async ({ db, params: { id }, body, set }) => {
    const updated = await db.update(people)
                            .set(body)
                            .where(eq(people.id, id))
                            .returning()

    if (updated.length === 0) {
      set.status = 'Not Found'
      return 'Cannot update this person =('
    }

    set.status = 'OK'
    return updated[0]
  },{
    body: createPersonSchema,
    params: identityParams,
    response: {
      404: t.String(),
      200: personSchema
    }
  })

  ///
  /// GET a person by id
  ///
  .get('/people/:id', async ({ db, params: { id }, set }) => {
    const person = await db.query.people.findFirst({
      where: eq(people.id, id)
    })

    if (person === undefined) {
      set.status = 'Not Found'
      return 'I do not know this person =('
    }

    return person
  },{
    params: identityParams,
    response: {
      404: t.String(),
      200: personSchema
    }
  })