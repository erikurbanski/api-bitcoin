import { hash } from 'bcryptjs'

import { AccountAlreadyExistsError } from './errors/accountAlreadyExistsError'

import { type Account } from '@prisma/client'
import { type AccountsRepository } from '@/repositories/interfaces/accountsRepository'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  account: Account
}

export class RegisterService {
  private readonly accountsRepository: AccountsRepository

  // Dependency inversion principle
  constructor (
    accountsRepository: AccountsRepository
  ) {
    this.accountsRepository = accountsRepository
  }

  async execute ({
    name,
    email,
    password
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.accountsRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new AccountAlreadyExistsError()
    }

    const account = await this.accountsRepository.create({
      name,
      email,
      password: passwordHash
    })

    return { account }
  }
}
