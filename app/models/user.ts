import Role from '#models/role'
import Task from '#models/task'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare instagramUrl: string

  @column()
  declare linkedinUrl: string

  @column()
  declare githubUrl: string

  @column()
  declare twitterUrl: string

  @column()
  declare roleId: number

  @column()
  declare isBanned: boolean

  @column()
  declare isVerified: boolean

  @column({ serializeAs: null })
  declare verificationToken?: string

  @column.dateTime({ serializeAs: null })
  declare verificationTokenExpiresAt?: DateTime

  @column({ serializeAs: null })
  declare resetPasswordToken?: string

  @column.dateTime({ serializeAs: null })
  declare resetPasswordTokenExpiresAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @hasMany(() => Task, {
    foreignKey: 'assignedTo',
  })
  declare assignedTasks: HasMany<typeof Task>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
