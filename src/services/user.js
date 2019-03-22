import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/user?${stringify(params)}`);
}
export async function create(params) {
  return request('/api/user', {
    method: 'POST',
    body: params,
  });
}
export async function update(params) {
  return request('/api/user/' + params.id, {
    method: 'PUT',
    body: params,
  });
}
export async function deleteUser(params) {
  return request('/api/user/' + params.id, {
    method: 'DELETE'
  });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
