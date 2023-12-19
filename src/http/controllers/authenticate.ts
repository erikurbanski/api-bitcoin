import { z } from 'zod'
import { type FastifyReply, type FastifyRequest } from 'fastify'

import { InvalidCredentialError } from '@/services/errors/invalidCredentialError'
import { makeAuthenticateServiceCase } from '@/services/factories/makeAuthenticateServiceCase'

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6)
  })

  const { email, password } = authBodySchema.parse(request.body)

  try {
    const authService = makeAuthenticateServiceCase()
    const { account } = await authService.execute({
      email,
      password
    })

    const token = await reply.jwtSign(
      {
        id: account.id,
        name: account.name
      },
      {
        sign: {
          sub: account.email
        }
      })

    return await reply.status(200)
      .send({ email, token })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return await reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
