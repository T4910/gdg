import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .notNullable()
        .defaultTo(2)
        .onDelete('CASCADE')

      table.string('first_name')
      table.string('last_name')
      table.string('username')
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('instagram_url').nullable()
      table.string('linkedin_url').nullable()
      table.string('github_url').nullable()
      table.string('twitter_url').nullable()
      table
        .integer('assigned_to')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()
      table.boolean('is_banned').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)
      table.string('verification_token').nullable()
      table.timestamp('verification_token_expires_at').nullable()
      table.string('reset_password_token').nullable()
      table.timestamp('reset_password_token_expires_at').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
