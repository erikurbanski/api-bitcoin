import { AccountService } from '@/services/account'
import { PrismaAccountsRepository } from '@/repositories/prisma/prismaAccountsRepository'

export function makeAccountServiceCase () {
  const accountsRepository = new PrismaAccountsRepository()
  const accountService = new AccountService(accountsRepository)

  return accountService
}
