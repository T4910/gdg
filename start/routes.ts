/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import adminMiddleware from '#middleware/admin_middleware'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Home
router.get('/', async () => {
  return {
    message: 'Emmanuel Taiwo backend submission',
  }
})

// Tasks
router
  .resource('users.tasks', '#controllers/tasks_controller')
  .params({ users: 'userId', tasks: 'taskId' })
  .use(['store', 'update', 'destroy'], middleware.auth())
  .apiOnly()

// Authentication
router
  .group(() => {
    router.post('login', '#controllers/authenticators_controller.login')
    router.post('register', '#controllers/authenticators_controller.register')
    router.post('forgot-password', '#controllers/authenticators_controller.forgot')
    router.post('reset-password', '#controllers/authenticators_controller.reset')
    router.post('logout', '#controllers/authenticators_controller.logout').use(middleware.auth())
    router.get('verify', '#controllers/authenticators_controller.verify')
    router.get('me', '#controllers/authenticators_controller.getDetails')
  })
  .prefix('auth')

// Admin
router
  .group(() => {
    router
      .resource('users', '#controllers/admin_controller')
      .only(['index', 'show', 'store', 'destroy'])
  })
  .prefix('admin')
  .use([middleware.auth(), middleware.admin()])
