import { type Account, type Prisma } from '@prisma/client'
import { type AccountsRepository } from '@/repositories/interfaces/accountsRepository'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async findById (id: number) {
    const account = this.items.find(item => item.id === id)
    if (!account) {
      return null
    }

    return account
  }

  async findByEmail (email: string) {
    const account = this.items.find(item => item.email === email)
    if (!account) {
      return null
    }

    return account
  }

  async create (data: Prisma.AccountCreateInput) {
    const account = {
      id: 1,
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null
    }

    this.items.push(account)

    return account
  }
}
