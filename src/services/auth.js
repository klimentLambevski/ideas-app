import * as Api from "./api/gateway";
import {clearAccessToken, getAccessToken, setAccessToken} from "./accessToken";


const refreshToken = () =>{
  let accessToken = getAccessToken();

  if(!accessToken) {
    return Promise.reject(null);
  }

  return Api.post(Api.Resources.accessTokens.refresh, {refresh_token: accessToken.refresh_token})
    .then(res => {
      accessToken.jwt = res.jwt;
      return setAccessToken(accessToken);
    });
};


const refreshTokenHandler = (request, ...args) =>
  request(...args)
    .catch(err => {
      if (err.response.status === 401) {
        return refreshToken()
          .catch(e => err)
          .then(res => request(...args))
      } else {
        return Promise.reject(err);
      }
    });

const logOut = () => {
  let accessToken = getAccessToken();

  if(!accessToken) {
    return Promise.resolve(null);
  }
  return refreshTokenHandler(Api.deleteResource, Api.Resources.accessTokens.default, {refresh_token: accessToken.refresh_token})
    .then(clearAccessToken);
};

export {
  refreshToken,
  refreshTokenHandler,
  logOut
}

