declare module '@ioc:Adonis/Addons/Auth0' {
  import { WebAuth } from 'auth0-js'
  import { AuthenticationClient } from 'auth0'
  const Auth0: AuthenticationClient
  export default Auth0
}
