import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { AuthenticationClient } from 'auth0'
import { WebAuth } from 'auth0-js'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class Auth0Provider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Adonis/Addons/Auth0', () => {
      const Auth0 = new AuthenticationClient({
        domain: 'aircube.jp.auth0.com',
        clientId: 'GfHwwLaCRDk8aNBAgk0B0ifqkWIAxeyR',
      })
      return Auth0
    })
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
