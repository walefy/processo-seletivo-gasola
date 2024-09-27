import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import { DEFAULT_USER_LIFE } from '../constants.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare name: string

  @column({ columnName: 'current_word', consume: (value) => value ?? '' })
  declare currentWord: string

  @column({ columnName: 'current_life', consume: (value) => value ?? DEFAULT_USER_LIFE })
  declare currentLife: number

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
