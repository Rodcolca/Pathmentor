import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  OPENROUTER_API_KEY: z
    .string()
    .min(1, { message: 'OPENROUTER_API_KEY is required' }),
  OPENROUTER_MODEL: z.string().default('openrouter/free'),
  OPENROUTER_BASE_URL: z
    .string()
    .url()
    .default('https://openrouter.ai/api/v1'),
  ALLOWED_ORIGINS: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const data = parsed.data;

const allowedOrigins = data.ALLOWED_ORIGINS
  ? data.ALLOWED_ORIGINS.split(',').map((value) => value.trim()).filter(Boolean)
  : [];

export const config = {
  env: data.NODE_ENV,
  port: data.PORT,
  openRouter: {
    apiKey: data.OPENROUTER_API_KEY,
    model: data.OPENROUTER_MODEL,
    baseUrl: data.OPENROUTER_BASE_URL
  },
  allowedOrigins
};

export type AppConfig = typeof config;
