import {useAuth0} from "@auth0/auth0-react";


const jsonHttp = async (url, method, body = null, options = {}) => {
  let response = null;
  let METHOD = method.toUpperCase().trim();
 
  if (METHOD === 'GET') {
    response = await fetch(url, {
      method: METHOD,
      headers: options.headers,
      contentType: "application/json",
    });
  } else {
    response = await fetch(url, {
      method: METHOD,
      body: JSON.stringify(body),
      headers: options.headers,
      contentType: "application/json",
    });
  }


  // Check if response is OK
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP Error ${response.status}: ${error}`);
  }


  // Parse the JSON response
  return response.json();
};


class RestClient {
  _getAccessToken = ()=>null;
  _baseUrl = import.meta.env.VITE_APP_API;


  constructor(getAccessTokenFn) {
    this._getAccessToken = getAccessTokenFn;
  }


  get accessToken() {
    return this._getAccessToken();
  }


  async getPermissions() {
    return jsonHttp(`${this._baseUrl}/s/permissions`, 'GET', null, {
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      }
    });
  }


  async health() {
    return jsonHttp(`${this._baseUrl}/health`, 'GET');
  }


  async getUserPromptHistory() {
    return jsonHttp(`${this._baseUrl}/s/history`, 'GET', null, {
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      }
    });
  }


  async getChatLog(chatId) {
    return jsonHttp(`${this._baseUrl}/s/chat/${chatId}`, 'GET', null, {
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      }
    });
  }


  async createNewChat(promptText) {
    return jsonHttp(`${this._baseUrl}/s/chat`, 'POST', {'promptText': promptText}, {
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      }
    );
  }
}


const useRestClient = () => {
  const { getAccessTokenSilently } = useAuth0();
  return new RestClient(getAccessTokenSilently);
};


export default useRestClient;