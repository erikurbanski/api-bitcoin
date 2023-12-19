import { type FastifyInstance } from 'fastify'

import { deposit } from './controllers/deposit'
import { profile } from './controllers/profile'
import { register } from './controllers/register'
import { verifyJWT } from './middlewares/verifyJwt'
import { authenticate } from './controllers/authenticate'

export async function appRoutes (app: FastifyInstance) {
  app.post('/accounts', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.post('/deposit', { onRequest: [verifyJWT] }, deposit)
}
