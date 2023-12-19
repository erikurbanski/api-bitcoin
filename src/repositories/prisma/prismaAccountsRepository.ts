import { prisma } from '@/lib/prisma'

import { type Prisma } from '@prisma/client'
import { type AccountsRepository } from '../interfaces/accountsRepository'

export class PrismaAccountsRepository implements AccountsRepository {
  async findById (id: number) {
    const account = await prisma.account.findUnique({
      where: {
        id
      }
    })

    return account
  }

  async findByEmail (email: string) {
    const account = await prisma.account.findUnique({
      where: {
        email
      }
    })

    return account
  }

  async create (data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data
    })

    return account
  }
}
