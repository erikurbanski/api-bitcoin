import { type FastifyReply, type FastifyRequest } from 'fastify'

import { ResourceNotFound } from '@/services/errors/resourceNotFound'
import { makeBalanceServiceCase } from '@/services/factories/makeBalanceServiceCase'

export async function balance (request: FastifyRequest, reply: FastifyReply) {
  const accountId = request.user.id

  try {
    const balanceService = makeBalanceServiceCase()
    const balance = await balanceService.execute({ accountId })

    return await reply.status(200).send(balance)
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return await reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
