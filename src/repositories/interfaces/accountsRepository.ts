import { type Prisma, type Account } from '@prisma/client'

export interface AccountsRepository {
  findById: (id: number) => Promise<Account | null>
  findByEmail: (email: string) => Promise<Account | null>
  create: (data: Prisma.AccountCreateInput) => Promise<Account>
}
