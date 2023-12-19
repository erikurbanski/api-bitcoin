import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryAccountsRepository } from './in-memory/inMemoryUserRepository'
import { AuthenticateService } from '@/services/authenticate'

let sut: AuthenticateService
let accountsRepository: InMemoryAccountsRepository

describe('Auth service', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository()
    sut = new AuthenticateService(accountsRepository)
  })

  it('should be able to authenticate', async () => {
    await accountsRepository.create({
      name: 'Manoela Alencar',
      email: 'manoelaalencar@gmail.com',
      password: await hash('123456', 6)
    })

    const { account } = await sut.execute({
      email: 'manoelaalencar@gmail.com',
      password: '123456'
    })

    expect(account.id).toEqual(expect.any(Number))
  })
})
