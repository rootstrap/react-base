import fetch from 'isomorphic-fetch';
import { sessionService } from 'redux-react-session';
import humps from 'humps';

import getResponseBody from 'api/utils/getResponseBody';
import handleErrors from 'api/utils/handleErrors';

const ACCESS_TOKEN = 'access-token';
const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

const HTTP_VERB = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

class Api {
  static async get(uri, apiUrl = process.env.API_URL) {
    const requestData = Api.buildRequest(HTTP_VERB.GET);
    const data = await this.addSessionHeaders(requestData);
    return this.performRequest(uri, apiUrl, data);
  }

  static async post(uri, body, apiUrl = process.env.API_URL) {
    const requestData = Api.buildRequest(HTTP_VERB.POST, body);
    const data = await this.addSessionHeaders(requestData);
    return this.performRequest(uri, apiUrl, data);
  }

  static async delete(uri, body, apiUrl = process.env.API_URL) {
    const requestData = Api.buildRequest(HTTP_VERB.DELETE, body);
    const data = await this.addSessionHeaders(requestData);
    return this.performRequest(uri, apiUrl, data);
  }

  static async put(uri, body, apiUrl = process.env.API_URL) {
    const requestData = Api.buildRequest(HTTP_VERB.PUT, body);
    const data = await this.addSessionHeaders(requestData);
    return this.performRequest(uri, apiUrl, data);
  }

  static async patch(uri, body, apiUrl = process.env.API_URL) {
    const requestData = Api.buildRequest(HTTP_VERB.PATCH, body);
    const data = await this.addSessionHeaders(requestData);
    return this.performRequest(uri, apiUrl, data);
  }

  static buildRequest(httpVerb, body = undefined) {
    return {
      method: httpVerb,
      headers: {
        accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      ...(body && { body: JSON.stringify(humps.decamelizeKeys(body)) }),
    };
  }

  static async addSessionHeaders(data) {
    const requestData = { ...data };
    try {
      await sessionService.refreshFromLocalStorage();
      const headers = await Api.getTokenHeader();
      requestData.headers = { ...requestData.headers, ...headers };
      return requestData;
    } catch (err) {
      return requestData;
    }
  }

  static async getTokenHeader() {
    const { token, client, uid } = await sessionService.loadSession();
    return { [ACCESS_TOKEN]: token, client, uid };
  }

  static performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(humps.camelizeKeys(response)))
        .catch(error => reject(humps.camelizeKeys(error)));
    });
  }
}

export default Api;
