import axios from 'axios';
import { isEmpty, assign, merge } from 'lodash';

import CookieHandlerInstance from './cookie';
import { UNAUTHORIZED } from './httpStatus';
import { API_DOMAIN } from '../config';

const singletonEnforcer = Symbol();

class AxiosClient {
  axiosClient;
  static axiosClientInstance;

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }
    this.axiosClient = axios.create({
      baseURL: process.env.API_VERSION ? API_DOMAIN + '/' + process.env.API_VERSION : API_DOMAIN,
      headers: {
        common: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    });
    if (!this.athenaClient)
      if (CookieHandlerInstance.checkCookie('access_token')) {
        this.setHeader(CookieHandlerInstance.getCookie('access_token'));
      }

    this.axiosClient.interceptors.request.use(
      (configure) => {
        return configure;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axiosClient.interceptors.response.use(
      (response) => {
        if (
          response.data.data &&
          response.data.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          response.data.data.dataObject = response.data.data.data.reduce((dataObject, item) => {
            dataObject[item.id] = item;
            return dataObject;
          }, {});
        }
        return response;
      },
      (error) => {
        let dataErrors = error.response.data;
        error.response.errorsObject = {};
        dataErrors.errorsObject = {};

        if (dataErrors.errors && Array.isArray(dataErrors.errors)) {
          if (
            error.response.status === UNAUTHORIZED &&
            dataErrors.errors[0].message === 'UNAUTHENTICATED'
          ) {
            CookieHandlerInstance.removeCookie('token');
            window.location.replace('/');
          }
        }
        return Promise.reject(error.response);
      },
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  setHeader(userToken = '') {
    const jwt = /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/;

    if (jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    }
  }

  get(resource, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(requestURL, {
      data: null,
      ...merge({ headers: this.axiosClient.defaults.headers }, config),
    });
  }

  post(resource, data, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers),
    );
  }

  update(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers),
    );
  }

  put(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers),
    );
  }

  patch(resource, data, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers),
    );
  }

  delete(resource, data, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers),
    });
  }
}

export default AxiosClient.instance;
