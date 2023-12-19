import { z } from 'zod'
import { type FastifyReply, type FastifyRequest } from 'fastify'

import { makeRegisterServiceCase } from '@/services/factories/makeRegisterServiceCase'
import { AccountAlreadyExistsError } from '@/services/errors/accountAlreadyExistsError'

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterServiceCase()
    await registerService.execute({
      name,
      email,
      password
    })
  } catch (err) {
    if (err instanceof AccountAlreadyExistsError) {
      return await reply.status(400).send({ message: err.message })
    }
  }

  return await reply.status(201).send()
}
