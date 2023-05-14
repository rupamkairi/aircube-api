import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'

export default class FoldersController {
  public async create({ request, response, auth }: HttpContextContract) {
    let user = await auth.authenticate()
    if (!user) return response.unauthorized()

    let data = request.only(['name', 'path', 'storage_id', 'folder_id'])

    if (data.folder_id) {
      const parent = await Folder.find(data.folder_id)
      if (parent?.path === '/') parent.path = ''
      data.path = parent?.path! + '/' + parent?.name
    } else {
      data.path = '/'
    }

    // let created = data
    let created = await Folder.create(data)
    response.status(201).json(created)
  }

  public async show({ request, response, auth }: HttpContextContract) {
    let user = await auth.authenticate()
    if (!user) return response.unauthorized()

    if (!request.param('id')) return response.notFound()

    let created = await Folder.find(request.param('id'))
    response.status(201).json(created)
  }
}

Route.group(() => {
  Route.post('', 'FoldersController.create').as('create')
  Route.get('/:id', 'FoldersController.show').as('show')
})
  .as('folders')
  .prefix('/folders')
