import cors from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from "elysia"
import { locationsController } from './controllers/locations'
import { peopleController } from './controllers/people'
import { logger, logging } from './plugins/logging'

const app = new Elysia()
  .use(logging)  
  .onError(({ error }) => {
    logger.error(error)
  })
  .use(swagger())
  .use(cors())
  .use(peopleController)
  .use(locationsController)
  .listen(process.env.API_PORT ?? 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)