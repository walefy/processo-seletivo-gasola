import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(50),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(6).maxLength(16),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
