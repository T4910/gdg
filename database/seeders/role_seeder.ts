import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        name: 'admin',
        description: 'Administrator with full access',
      },
      {
        name: 'user',
        description: 'Regular user with standard access',
      },
      {
        name: 'guest',
        description: 'Guest user with limited access',
      },
    ])
  }
}
