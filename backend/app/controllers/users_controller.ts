import User from '#models/user'
import { createUserValidator, loginUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user = await User.create(payload)
    const accessToken = await User.accessTokens.create(user)

    return response.created({ token: accessToken.value!.release() })
  }

  async login({ request, response }: HttpContext) {
    const data = request.all()
    const { email, password } = await loginUserValidator.validate(data)

    const user = await User.verifyCredentials(email, password)
    const accessToken = await User.accessTokens.create(user)

    return response.ok({ token: accessToken.value!.release() })
  }
}
