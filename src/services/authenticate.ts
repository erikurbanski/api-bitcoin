import { compare } from 'bcryptjs'

import { InvalidCredentialError } from './errors/invalidCredentialError'

import { type Account } from '@prisma/client'
import { type AccountsRepository } from '@/repositories/interfaces/accountsRepository'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  account: Account
}

export class AuthenticateService {
  constructor (private readonly accountsRepository: AccountsRepository) {}

  async execute ({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const account = await this.accountsRepository.findByEmail(email)
    if (!account) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, account.password)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return { account }
  }
}
