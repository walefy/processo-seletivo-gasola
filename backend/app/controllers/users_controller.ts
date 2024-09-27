import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const user = await User.create(payload)
    const accessToken = await User.accessTokens.create(user)

    return { token: accessToken.value!.release() }
  }
}
