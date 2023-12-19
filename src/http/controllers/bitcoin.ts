import { type FastifyReply, type FastifyRequest } from 'fastify'

import { ResourceNotFound } from '@/services/errors/resourceNotFound'
import { makeBitcoinServiceCase } from '@/services/factories/makeBitcoinServiceCase'

export async function bitcoin (request: FastifyRequest, reply: FastifyReply) {
  try {
    const bitcoinService = makeBitcoinServiceCase()
    const data = await bitcoinService.execute()

    return await reply.status(200).send(data)
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return await reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
