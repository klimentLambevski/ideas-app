let accessToken = null;

const setAccessToken = (token) => {
  accessToken = token;
  sessionStorage.setItem('token', JSON.stringify(token));
  return token;
};

const getAccessToken = () => {
  return accessToken;
};

const clearAccessToken = () => {
  sessionStorage.removeItem('token')
};

const initAccessToken = () => {
  try {
    accessToken = JSON.parse(sessionStorage.getItem('token'));
  } catch (ex) {
    accessToken = null;
  }
};

export {
  setAccessToken,
  clearAccessToken,
  initAccessToken,
  getAccessToken
}
