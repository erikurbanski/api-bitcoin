import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: { id: number, name: string }
    user: {
      id: number
      sub: string
      name: string
    }
  }
}
