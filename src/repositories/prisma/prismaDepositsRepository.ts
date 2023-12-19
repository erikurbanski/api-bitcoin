import { prisma } from '@/lib/prisma'

import { type Prisma } from '@prisma/client'
import { type DepositsRepository } from '../interfaces/depositsRepository'

export class PrismaDepositsRepository implements DepositsRepository {
  async getBalance (accountId: number) {
    const balance = await prisma.deposit.groupBy({
      by: ['account_id'],
      where: {
        account_id: accountId
      },
      _sum: {
        amount: true
      }
    })

    return balance[0]._sum.amount
  }

  async create (data: Prisma.DepositUncheckedCreateInput) {
    const deposit = await prisma.deposit.create({
      data
    })

    return deposit
  }
}
