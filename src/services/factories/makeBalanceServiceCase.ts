import { BalanceService } from '@/services/balance'
import { PrismaDepositsRepository } from '@/repositories/prisma/prismaDepositsRepository'

export function makeBalanceServiceCase () {
  const accountsRepository = new PrismaDepositsRepository()
  const registerService = new BalanceService(accountsRepository)

  return registerService
}
