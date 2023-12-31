import { type FastifyInstance } from 'fastify'

import { bitcoin } from './controllers/bitcoin'
import { balance } from './controllers/balance'
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
  app.get('/balance', { onRequest: [verifyJWT] }, balance)
  app.get('/btc/price', { onRequest: [verifyJWT] }, bitcoin)
  app.post('/deposit', { onRequest: [verifyJWT] }, deposit)
}
