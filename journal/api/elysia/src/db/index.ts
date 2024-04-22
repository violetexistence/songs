import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema'

const dbUrl = process.env.DB_URL ?? 'journal.dev.db'
const sqlite = new Database(dbUrl, {create: true})

export const db = drizzle(sqlite, { schema })