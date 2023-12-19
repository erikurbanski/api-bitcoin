import { DepositService } from '@/services/deposit'
import { PrismaAccountsRepository } from '@/repositories/prisma/prismaAccountsRepository'
import { PrismaDepositsRepository } from '@/repositories/prisma/prismaDepositsRepository'

export function makeDepositServiceCase () {
  const accountsRepository = new PrismaAccountsRepository()
  const depositsRepository = new PrismaDepositsRepository()

  const depositService = new DepositService(accountsRepository, depositsRepository)

  return depositService
}
