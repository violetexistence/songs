import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const people = sqliteTable('people', {
  id: integer('id').primaryKey({autoIncrement: true}),
  name: text('name').notNull(),
  notes: text('notes'),
  avatar: text('avatar')
})

export const personSchema = createSelectSchema(people)
export const createPersonSchema = createInsertSchema(people)