import { eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { db } from "../db";
import { createLocationsSchema, locations, locationsSchema } from '../db/schema';
import { identityParams } from '../types';

export const locationsController = new Elysia()
  .decorate('db', db)

  ///
  /// GET all locations
  ///
  .get('/locations', ({ db }) => {
    return db.select().from(locations)
  },{
      response: t.Array(locationsSchema)
  })

  /// 
  /// CREATE a new location
  ///     
  .post('/locations', ({ db, body }) => {
    return db.insert(locations)
            .values(body)
            .returning()
            .then(rows => rows[0])
  },{
      body: createLocationsSchema,
      response: locationsSchema
  })
  ///
  /// DELETE a location
  ///
  .delete('/locations/:id', async ({ db, params: { id }, set }) => {
    const deleted = await db.delete(locations)
                            .where(eq(locations.id, id))
                            .returning()
    
    if (deleted.length === 0) {
      set.status = 'Not Found'
      return 'Cannot delete this location =('
    }

    set.status = 'No Content'
  },{
    params: identityParams
  })

  ///
  /// UPDATE a location
  ///
  .put('/locations/:id', async ({ db, params: { id }, body, set }) => {
    const updated = await db.update(locations)
                            .set(body)
                            .where(eq(locations.id, id))
                            .returning()
    
    if (updated.length === 0) {
      set.status = 'Not Found'
      return 'Cannot update this location =('
    }

    set.status = 'OK'
    return updated[0]
  },{
      body: createLocationsSchema,
      params: identityParams,
      response: {
          404: t.String(),
          200: locationsSchema
      }
  })

  ///
  /// GET a location by ID
  ///
  .get('/locations/:id', async ({ db, params: { id }, set }) => {
    const location = await db.query.locations.findFirst({
        where: eq(locations.id, id)
    })
    
    if (location === undefined) {
      set.status = 'Not Found'
      return 'Cannot find this location =('
    }

    return location
  },{
    params: identityParams,
    response: {
      404: t.String(),
      200: locationsSchema
    }
  })