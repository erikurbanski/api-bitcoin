import { type FastifyReply, type FastifyRequest } from 'fastify'
import { makeAccountServiceCase } from '@/services/factories/makeAccountServiceCase'

export async function profile (request: FastifyRequest, reply: FastifyReply) {
  const accountService = makeAccountServiceCase()

  const { account } = await accountService.execute({
    accountId: request.user.id
  })

  return await reply.status(200).send({ account })
}
