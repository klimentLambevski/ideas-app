import * as Api from './api/gateway';
import {refreshTokenHandler} from "./auth";
import {setAccessToken} from "./accessToken";

const signUp = (data) =>
  Api.post(Api.Resources.users, data)
    .then(setAccessToken)
    .then(getSelf);

const signIn = (data) =>
  Api.post(Api.Resources.accessTokens.default, data)
    .then(setAccessToken)
    .then(getSelf);

const getSelf = () =>
  refreshTokenHandler(Api.get, Api.Resources.me);

export {
  signUp,
  signIn,
  getSelf
}
