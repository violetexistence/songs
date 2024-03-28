import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

async function main() {
  const sqlite = new Database(process.env.DB_URL, { create: true })
  const db = drizzle(sqlite)
  
  console.log('[migrate] Running migration...')

  await migrate(db, { migrationsFolder: './src/db/drizzle' })
  
  console.log('[migrate] Migration complete')
}

main().catch(reason => {
  console.error(reason)
})