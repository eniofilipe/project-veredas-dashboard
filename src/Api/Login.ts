import api from './Api';
import { Login, LoginResponse, ResponseValidaToken } from '../Types';

export const getLogin = async (data: Login) => api.post<LoginResponse>('/sessao', data);

export const getValidaToken = async (token: string) =>
  api.post<ResponseValidaToken>('/valida-token', { data: { token } });
