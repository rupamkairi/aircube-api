import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import Folder from 'App/Models/Folder'
import Storage from 'App/Models/Storage'

export default class FilesController {
  public async create({ request, response, auth }: HttpContextContract) {
    let user = await auth.authenticate()
    if (!user) return response.unauthorized()

    let data = request.only(['name', 'path', 'size', 'metadata', 'storage_id', 'folder_id'])

    if (!data.storage_id) return response.notFound()

    if (data.folder_id) {
      const parent = await Folder.find(data.folder_id)
      if (parent?.path === '/') parent.path = ''
      data.path = parent?.path! + '/' + parent?.name
    } else {
      data.path = '/'
    }

    let created = await File.create(data)

    if (!created) return response.abort('Failed')
    await Storage.query()
      .where({ id: created.storageId })
      .increment({ used: Number(created.size) })
      .decrement({ free: Number(created.size) })
      .update({}, ['used', 'free'])
      .select('used', 'free')
      .first()

    response.status(201).json(created)
  }

  public async show({ request, response, auth }: HttpContextContract) {
    let user = await auth.authenticate()
    if (!user) return response.unauthorized()

    if (!request.param('id')) return response.notFound()

    let created = await File.find(request.param('id'))
    response.status(201).json(created)
  }
}

Route.group(() => {
  Route.post('', 'FilesController.create').as('create')
  Route.get('/:id', 'FilesController.show').as('show')
})
  .as('files')
  .prefix('/files')
