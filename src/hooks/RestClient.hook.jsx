import {useAuth0} from "@auth0/auth0-react";


const jsonHttp = async (url, method, body = null, options = {}) => {

  let response = null;
  let METHOD = method.toUpperCase().trim();
  if (METHOD === 'GET') {
    response = await fetch(url, {
      method: METHOD,
      headers: options.headers,
      contentType: "application/json",
    })
  } else {
    response = await fetch(url, {
      method: METHOD,
      body: JSON.stringify(body),
      headers: options.headers,
      contentType: "application/json",
    })
  }

  return response
};


class RestClient {

  _getAccessToken = ()=>null;
  _baseUrl = import.meta.env.VITE_APP_API


  constructor(getAccessTokenFn) {
    this._getAccessToken = getAccessTokenFn
  }

  get accessToken() {
    return this._getAccessToken()
  }


  async getPermissions() {
    return jsonHttp(`${this._baseUrl}/s/permissions`, 'GET', null, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    })
  }

  async health() {
    return jsonHttp(`${this._baseUrl}/health`, 'GET')
  }
}

const useRestClient = () => {
  const { getAccessTokenSilently } = useAuth0();
  return new RestClient(getAccessTokenSilently);
};

export default useRestClient;
