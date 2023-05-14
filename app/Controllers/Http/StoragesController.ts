import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Storage from 'App/Models/Storage'

export default class StoragesController {
  public async setup({ response, auth }: HttpContextContract) {
    let user = await auth.authenticate()
    if (!user) return response.unauthorized()

    let found = await Storage.query()
      .where({ userId: user.id })
      .preload('folders')
      .preload('files')
      .first()
    if (found) return response.json(found)

    let created = await Storage.create({
      size: 1n * 1024n * 1024n * 50n,
      used: 0n,
      free: 1n * 1024n * 1024n * 50n,
      userId: user.id,
    })
    if (created) return response.status(201).json(created)
  }

  public async upgrade({ response }: HttpContextContract) {
    response.notImplemented()
  }
}

Route.group(() => {
  Route.post('', 'StoragesController.setup').as('setup')
  Route.patch('', 'StoragesController.upgrade').as('upgrade').prefix('/upgrade')
})
  .as('storages')
  .prefix('/storages')
