import * as api from './api-client';

type SuccessResponse<T> = {
  data: T
  ok: true;
};

export function auth(authToken?: string) {
  if (!authToken) {
    return Promise.reject(new Error('No auth token provided'));
  }
  return api.getUnauth('/auth', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export type Sleep = {
  id: string;
  wakeUpAt: string;
  goToBedAt: string;
  quality: 'very_bad' | 'bad' | 'meh' | 'good' | 'very_good';
};
export function getSleeps() {
  return api.get<SuccessResponse<Sleep[]>>('/sleep').then((response) => {
    return response.data;
  });
}