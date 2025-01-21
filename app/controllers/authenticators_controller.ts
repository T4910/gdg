import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthenticatorsController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return user
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return {
      ok: true,
      message: 'success',
    }
  }

  async getDetails({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user,
    }
  }

  async forgot({}: HttpContext) {}
  async reset({}: HttpContext) {}
  async verify({}: HttpContext) {}
}
