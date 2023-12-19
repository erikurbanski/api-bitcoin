### API Bitcoin com Prisma e Fastify
========================================================

Este documento visa auxiliar na configuração e no uso do projeto

- Node 
- TypeScript
- Fastify
- Prisma
- Docker

---

* JWT: Json Web Token
* Prisma: como ORM
* Fastify: como framework para construção do bakc-end
* Vitest: Para execução de teste
* Eslint e Prettier: Padrão de código para IDE


### Instalação e configuração da API


1. Criar .env apartir do .env.example.

2. Executar docker compose: <br>
`docker-compose up --build -d`

3. Instalar dependências: <br>
`npm install`

4. Executar migrations: <br>
`npx prisma migrate dev`

5. Acompanhar banco de dados pelo prisma: <br>
`npx prisma studio`

6. Executar servidor: <br>
`npm run dev`

7. Executar testes: <br>
`npm run test`
