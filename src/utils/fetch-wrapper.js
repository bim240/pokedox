import { backendUri } from './app_config';

export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};

const contentType = {
  JSON: 'application/json',
};

function getCombinedUrl(url) {
  return backendUri + url;
}

function get(url) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(getCombinedUrl(url)),
    },
    origin: '*',
    body: JSON.stringify(body),
  };
  return fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': contentType.JSON,
      ...authHeader(getCombinedUrl(url)),
    },
    origin: '*',
    body: JSON.stringify(body),
  };
  return fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}
function patch(url, body) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': contentType.JSON,
      ...authHeader(getCombinedUrl(url)),
    },
    origin: '*',
    body: JSON.stringify(body),
  };
  return fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
    origin: '*',
    headers: authHeader(getCombinedUrl(url)),
  };
  return fetch(getCombinedUrl(url), requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = 'token of the user ';
  const isLoggedIn = token;
  const isApiUrl = url.startsWith(backendUri);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
