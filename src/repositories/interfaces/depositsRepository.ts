import { type Prisma, type Deposit } from '@prisma/client'
import { type Decimal } from '@prisma/client/runtime/library'

export interface DepositsRepository {
  getBalance: (accountId: number) => Promise<Decimal | null>
  create: (data: Prisma.DepositUncheckedCreateInput) => Promise<Deposit>
}
