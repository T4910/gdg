import User from '#models/user'
import { taskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class TasksController {
  /**
   * Display a list of resource
   */
  async index({ params: { userId }, auth }: HttpContext) {
    await auth.check()
    const currentUser = auth.user?.id === Number(userId)

    if (currentUser) {
      const tasks = await auth.user.related('tasks').query().pojo()
      return {
        ok: true,
        data: tasks,
      }
    }

    const user = await User.findOrFail(userId)
    const tasks = await user.related('tasks').query().where('public', true).pojo()

    return {
      ok: true,
      data: tasks,
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, params: { userId } }: HttpContext) {
    const currentUser = auth.user?.id === Number(userId)

    if (!currentUser)
      return {
        ok: false,
        message: 'Unauthorized',
      }
    const data = await request.validateUsing(taskValidator)

    const task = auth.user?.related('tasks').create({
      ...data,
      dueDate: data.dueDate ? DateTime.fromJSDate(data.dueDate) : null,
    })

    return task
  }

  /**
   * Show individual record
   */
  async show({ params: { userId, taskId }, auth }: HttpContext) {
    await auth.check()
    const currentUser = auth.user?.id === Number(userId)

    if (currentUser) {
      const task = await auth.user.related('tasks').query().where('id', taskId).firstOrFail()
      return {
        ok: true,
        data: task,
      }
    }

    const user = await User.findOrFail(userId)

    try {
      const task = await user
        .related('tasks')
        .query()
        .where('id', taskId)
        .where('public', true)
        .firstOrFail()

      return {
        ok: true,
        data: task,
      }
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return {
          ok: false,
          message: 'Task not found',
        }
      }

      return {
        ok: false,
        message: 'An error occurred',
      }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ auth, request, params: { userId, taskId } }: HttpContext) {
    const reqMethod = request.method()
    if (reqMethod !== 'PATCH') return

    const currentUser = auth.user?.id === Number(userId)

    if (!currentUser)
      return {
        ok: false,
        message: 'Unauthorized',
      }

    const data = await request.validateUsing(taskValidator)

    const task = await auth.user
      .related('tasks')
      .query()
      .where('id', taskId)
      .update(data)
      .select('*')

    return {
      ok: true,
      data: task,
    }
  }

  /**
   * Delete record
   */
  async destroy({ params: { userId, taskId }, auth }: HttpContext) {
    const currentUser = auth.user?.id === Number(userId)

    if (!currentUser)
      return {
        ok: false,
        message: 'Unauthorized',
      }

    await auth.user.related('tasks').query().where('id', taskId).delete()

    return {
      ok: true,
      message: 'Task deleted successfully',
    }
  }
}
