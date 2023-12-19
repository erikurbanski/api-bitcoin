import { RegisterService } from '@/services/register'
import { PrismaAccountsRepository } from '@/repositories/prisma/prismaAccountsRepository'

export function makeRegisterServiceCase () {
  const accountsRepository = new PrismaAccountsRepository()
  const registerService = new RegisterService(accountsRepository)

  return registerService
}
