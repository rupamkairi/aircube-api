import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async singup({ request, response, auth }: HttpContextContract) {
    let data = request.only(['email', 'password'])
    let created = await User.create(data)
    let user = await auth.login(created)
    return response.json(user)
  }

  public async singin({ request, response, auth }: HttpContextContract) {
    let { email, password } = request.only(['email', 'password'])
    let user = await auth.attempt(email, password)
    return response.json(user)
  }

  public async passwordless({ request, response }: HttpContextContract) {
    let data = request.all()
    return response.json(data)
  }

  public async callback({ request, response }: HttpContextContract) {
    let data = request.all()
    return response.json(data)
  }

  public async logout({ request, response }: HttpContextContract) {
    let data = request.all()
    return response.json(data)
  }
}

Route.group(() => {
  Route.post('/signup', 'AuthController.singup').as('signup')
  Route.post('/signin', 'AuthController.singin').as('signin')
  Route.post('/passwordless', 'AuthController.passwordless').as('passwordless')
  Route.post('/callback', 'AuthController.callback').as('callback')
  Route.post('/logout', 'AuthController.logout').as('logout')
})
  .as('auth')
  .prefix('/auth')
