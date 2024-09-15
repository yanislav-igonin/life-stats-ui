import ky from 'ky';
import { config } from './config';

export const httpClientUnauthed = ky.create({
  prefixUrl: config.apiUrl,
});

export const httpClient = ky.create({
  prefixUrl: config.apiUrl,
  headers: {
    Authorization: localStorage.getItem('authToken') ?? '',
  },
  throwHttpErrors: true,
});
