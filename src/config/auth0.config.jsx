
const auth0Config = {
  domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin + import.meta.env.VITE_APP_BASENAME + import.meta.env.VITE_APP_CALLBACK_PATH
  },
  cacheLocation:"localstorage",
}

export default auth0Config;

export const DEFAULT_LOGOUT = {logoutParams: {
  returnTo: window.location.origin + import.meta.env.VITE_APP_BASENAME + import.meta.env.VITE_APP_LOGOUT_PATH
}}
