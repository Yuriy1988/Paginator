import fetch from 'isomorphic-fetch';

export const API_URL = 'https://jsonplaceholder.typicode.com';

export default function callApi(endpoint, method = 'get', body, options = { isJSON: true, token: null }) {
  const headers = {};

  // Set headers
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  if (options.isJSON) {
    headers['content-type'] = 'application/json';
  }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: options.isJSON ? JSON.stringify(body) : body,
  })
  .then(response => response.json().then(json => ({ json, response }))) // eslint-disable-line
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response, // eslint-disable-line
    error => error // eslint-disable-line
  );
}
