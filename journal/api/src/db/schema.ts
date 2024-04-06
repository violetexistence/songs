import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const people = sqliteTable('people', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull(),
  notes: text('notes'),
  avatar: text('avatar')
})

export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull(),
  notes: text('notes'),
  avatar: text('image')
} as const)

export const personSchema = createSelectSchema(people)
export const createPersonSchema = createInsertSchema(people) 
export const locationsSchema = createSelectSchema(locations)
export const createLocationsSchema = createInsertSchema(locations)