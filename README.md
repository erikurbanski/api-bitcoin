
1. Criar .env apartir do .env.exampl.

2. Executar docker compose:
docker-compose up --build -d

3. Instalar dependências:
npm install

4. Executar migrations:
npx prisma migrate dev

5. Acompanhar banco de dados pelo prisma:
npx prisma studio

6. Executar servidor:
npm run dev

7. Executar testes:
npm run test