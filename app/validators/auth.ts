import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        console.log(!match)
        return !match
      }),
    password,
    firstName: vine.string(),
    lastName: vine.string(),
    username: vine.string(),
    instagram: vine.string().optional(),
    github: vine.string().optional(),
    twitter: vine.string().optional(),
    linkedin: vine.string().optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
