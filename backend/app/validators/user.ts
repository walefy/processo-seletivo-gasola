import User from '#models/user'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(50),
    email: vine
      .string()
      .email()
      .unique(async (_, value, __) => {
        const userFound = await User.findBy({ email: value })
        return userFound === null
      }),
    password: vine.string().minLength(6).maxLength(16),
  })
)
