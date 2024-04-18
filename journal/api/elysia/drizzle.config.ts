import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: String(process.env.DB_URL)
  },
  verbose: true,
  strict: true
} satisfies Config