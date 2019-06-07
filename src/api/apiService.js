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

  static buildRequest(httpVerb, body) {
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

  static async performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;

    try {
      const response = await fetch(url, requestData);
      const processedResponse = await handleErrors(response);
      const body = await getResponseBody(processedResponse);
      return humps.camelizeKeys(body);
    } catch (error) {
      throw humps.camelizeKeys(error);
    }
  }
}

export default Api;
