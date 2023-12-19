import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { RegisterService } from '@/services/register'
import { InMemoryAccountsRepository } from './in-memory/inMemoryUserRepository'
import { AccountAlreadyExistsError } from '@/services/errors/accountAlreadyExistsError'

let sut: RegisterService
let accountsRepository: InMemoryAccountsRepository

describe('Register service', () => {
  beforeEach(() => {
    accountsRepository = new InMemoryAccountsRepository()
    sut = new RegisterService(accountsRepository)
  })

  it('should hash user pwd in registration', async () => {
    const { account } = await sut.execute({
      name: 'Erik Urbanski Santos',
      email: 'erikurbanski@gmail.com',
      password: '102030'
    })

    const matchPassword = await compare('102030', account.password)
    expect(matchPassword).toBe(true)
  })

  it('should be able to register', async () => {
    const { account } = await sut.execute({
      name: 'Ricardo Almeida',
      email: 'ricardoalmeida@gmail.com',
      password: '102030'
    })

    expect(account.id).toEqual(expect.any(Number))
  })

  // Possibles: skip, only
  it('should not be able to register with same email', async () => {
    const email = 'ricardoalmeida@gmail.com'

    await sut.execute({
      name: 'Ricardo Almeida',
      email,
      password: '102030'
    })

    await expect(async () =>
      await sut.execute({
        name: 'Ricardo Almeida',
        email,
        password: '102030'
      })
    ).rejects.toBeInstanceOf(AccountAlreadyExistsError)
  })
})
