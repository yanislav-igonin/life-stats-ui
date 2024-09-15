import { config } from './config';

const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export function getUnauth<T>(url: string, options?: RequestInit) {
  return fetch(`${config.apiUrl}${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<T>;
  });
}

export function get<T>(url: string, options?: RequestInit) {
  const authToken = localStorage.getItem('authToken')
  return fetch(`${config.apiUrl}${url}`, {...options, headers: {
    ...commonHeaders,
    ...options?.headers,
    Authorization: authToken ? `Bearer ${authToken}` : '',
  }}).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<T>;
  });
}

export function post<T>(url: string, body: unknown, options?: RequestInit) {
  const authToken = localStorage.getItem('authToken')
  return fetch(`${config.apiUrl}${url}`, {
    ...options,
    headers: {
      ...commonHeaders,
      ...options?.headers,
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<T>;
  });
}
