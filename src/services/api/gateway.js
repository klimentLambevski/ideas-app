import axios from 'axios'
import {getAccessToken} from "../accessToken";

const baseUrl = 'https://small-project-api.herokuapp.com';


const Resources = {
  ideas: '/ideas',
  users: '/users',
  accessTokens: {
    default: '/access-tokens',
    refresh: '/access-tokens/refresh'
  },
  me: '/me'
};

const get = (resource, params) =>
  axios.get(`${baseUrl}${resource}`, {
    params,
    headers: {
      'x-access-token': getAccessToken() && getAccessToken().jwt
    }
  }).then(({data}) => data);

const post = (resource, data) =>
  axios.post(`${baseUrl}${resource}`, data, {
    headers: {
      'x-access-token': getAccessToken() && getAccessToken().jwt
    }
  }).then(({data}) => data);

const put = (resource, id, data) =>
  axios.put(`${baseUrl}${resource}/${id}`, data, {
    headers: {
      'x-access-token': getAccessToken() && getAccessToken().jwt
    }
  }).then(({data}) => data);

const deleteResource = (resource, data) =>
  axios.delete(`${baseUrl}${resource}`, {
    data,
    headers: {
      'x-access-token': getAccessToken() && getAccessToken().jwt
    }
  }).then(({data}) => data);


export {
  Resources,
  post,
  put,
  get,
  deleteResource
}
