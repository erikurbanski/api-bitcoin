import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'

import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d'
  }
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Logs com DataDog/NewRealic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
