import { type Decimal } from '@prisma/client/runtime/library'
import { ResourceNotFound } from './errors/resourceNotFound'
import { type DepositsRepository } from '@/repositories/interfaces/depositsRepository'

interface BalanceServiceRequest {
  accountId: number
}

interface BalanceServiceResponse {
  balance: Decimal
}

export class BalanceService {
  constructor (private readonly depositsRepository: DepositsRepository) {}

  async execute ({ accountId }: BalanceServiceRequest): Promise<BalanceServiceResponse> {
    const balance = await this.depositsRepository.getBalance(accountId)
    if (!balance) {
      throw new ResourceNotFound()
    }

    return { balance }
  }
}
