import { swagger } from '@elysiajs/swagger';
import { ElysiaLogging } from '@otherguy/elysia-logging';
import { Elysia } from "elysia";
import { peopleController } from './controllers/people';
import cors from '@elysiajs/cors';
import { locationsController } from './controllers/locations'; // Import the LocationController

const app = new Elysia()
  .use(ElysiaLogging())
  .use(swagger())
  .use(cors())
  .onError(({ code, error }) => {
    console.error(error)
    return new Response(error.toString())
  })
  .use(peopleController)
  .use(locationsController)
  .listen(process.env.API_PORT || 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)