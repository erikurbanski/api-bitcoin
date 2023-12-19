import { type Deposit } from '@prisma/client'
import { type DepositsRepository } from '@/repositories/interfaces/depositsRepository'
import { type AccountsRepository } from '@/repositories/interfaces/accountsRepository'

import { ResourceNotFound } from './errors/resourceNotFound'
import { DepositNegativeValue } from './errors/depositNegativeValue'

interface DepositServiceRequest {
  amount: number
  accountId: number
}

interface DepositServiceResponse {
  deposit: Deposit
}

export class DepositService {
  constructor (
    private readonly accountsRepository: AccountsRepository,
    private readonly depositsRepository: DepositsRepository
  ) {}

  async execute ({ amount, accountId }: DepositServiceRequest): Promise<DepositServiceResponse> {
    if (amount < 0) {
      throw new DepositNegativeValue()
    }

    const existAccount = await this.accountsRepository.findById(accountId)
    if (!existAccount) {
      throw new ResourceNotFound()
    }

    const date = new Date()
    const deposit = await this.depositsRepository.create({
      date,
      amount,
      account_id: accountId
    })

    return { deposit }
  }
}
