import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ message: 'email inválido' })
    .email('email inválido'),
  password: z
    .string({ message: 'senha inválida' })
    .min(6, 'a senha precisa ter pelo menos 6 carácteres')
    .max(16, 'a senha precisa ter no máximo 16 carácteres')
})
