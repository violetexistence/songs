import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from '.'

async function main() {  
  console.log('[migrate] Running migration...')

  await migrate(db, { migrationsFolder: './src/db/drizzle' })
  
  console.log('[migrate] Migration complete')
}

main().catch(reason => {
  console.error(reason)
})