import { swagger } from '@elysiajs/swagger';
import { ElysiaLogging } from '@otherguy/elysia-logging';
import { Elysia } from "elysia";
import { peopleController } from './people.controller';

const app = new Elysia()
  .use(ElysiaLogging())
  .use(swagger())
  .onError(({ code, error }) => {
    console.error(error)
    return new Response(error.toString())
  })
  .use(peopleController)
  .listen(3030)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)