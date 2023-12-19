import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const message = 'Invalid environment variabels!'
  console.error(message, _env.error.format())
  throw new Error(message)
}

export const env = _env.data
