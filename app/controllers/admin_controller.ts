import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({}: HttpContext) {
    const users = await User.all()
    return {
      ok: true,
      data: users,
    }
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return {
      ok: true,
      data: user,
    }
  }

  async show({ params: { userId } }: HttpContext) {
    const user = await User.findOrFail(userId)
    return {
      ok: true,
      data: user,
    }
  }

  async delete({ params: { userId } }: HttpContext) {
    await User.query().where('id', userId).delete()

    return {
      ok: true,
      message: 'All users deleted',
    }
  }
}
