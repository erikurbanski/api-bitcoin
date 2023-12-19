import { z } from 'zod'
import { type FastifyReply, type FastifyRequest } from 'fastify'

import { ResourceNotFound } from '@/services/errors/resourceNotFound'
import { makeDepositServiceCase } from '@/services/factories/makeDepositServiceCase'
import { makeBalanceServiceCase } from '@/services/factories/makeBalanceServiceCase'
import { DepositNegativeValue } from '@/services/errors/depositNegativeValue'

export async function deposit (request: FastifyRequest, reply: FastifyReply) {
  const depositBodySchema = z.object({
    amount: z.number()
  })

  const accountId = request.user.id
  const { amount } = depositBodySchema.parse(request.body)

  try {
    const depositService = makeDepositServiceCase()
    const { deposit } = await depositService.execute({
      amount,
      accountId
    })

    const balanceService = makeBalanceServiceCase()
    const balance = await balanceService.execute({ accountId: deposit.account_id })

    return await reply.status(200).send(balance)
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return await reply.status(400).send({ message: err.message })
    }

    if (err instanceof DepositNegativeValue) {
      return await reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
