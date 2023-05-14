import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth0Controller {
  public async singup({ request, response }: HttpContextContract) {
    return response.json(request.body)
  }

  public async singin({ request, response, auth }: HttpContextContract) {
    return response.json(request.body)
  }

  public async passwordless({ request, response }: HttpContextContract) {
    return response.json(request.body)
  }

  public async callback({ request, response }: HttpContextContract) {
    return response.json(request.body)
  }

  public async logout({ request, response }: HttpContextContract) {
    return response.json(request.body)
  }
}

Route.group(() => {
  Route.post('/signup', 'AuthController.singup').as('signup')
  Route.post('/signin', 'AuthController.singin').as('signin')
  Route.post('/passwordless', 'AuthController.passwordless').as('passwordless')
  Route.post('/callback', 'AuthController.callback').as('callback')
  Route.post('/logout', 'AuthController.logout').as('logout')
})
  .as('auth0')
  .prefix('/auth0')
