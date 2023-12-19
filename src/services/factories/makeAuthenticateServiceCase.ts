import { AuthenticateService } from '@/services/authenticate'
import { PrismaAccountsRepository } from '@/repositories/prisma/prismaAccountsRepository'

export function makeAuthenticateServiceCase () {
  const accountsRepository = new PrismaAccountsRepository()
  const authService = new AuthenticateService(accountsRepository)

  return authService
}
