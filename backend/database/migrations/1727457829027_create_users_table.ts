import { BaseSchema } from '@adonisjs/lucid/schema'
import { DEFAULT_USER_LIFE } from '../../app/constants.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('name').notNullable()
      table.string('current_word').nullable()
      table.tinyint('current_life').defaultTo(DEFAULT_USER_LIFE)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
