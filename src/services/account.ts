import { type Account } from '@prisma/client'
import { type AccountsRepository } from '@/repositories/interfaces/accountsRepository'

import { ResourceNotFound } from './errors/resourceNotFound'

interface AccountServiceRequest {
  accountId: number
}

interface AccountServiceResponse {
  account: Account
}

export class AccountService {
  constructor (private readonly accountsRepository: AccountsRepository) {}

  async execute ({ accountId }: AccountServiceRequest): Promise<AccountServiceResponse> {
    const account = await this.accountsRepository.findById(accountId)
    if (!account) {
      throw new ResourceNotFound()
    }

    return { account }
  }
}
