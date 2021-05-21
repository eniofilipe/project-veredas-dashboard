import api from './Api';
import { Login, LoginResponse, ResponseValidaToken } from '../Types';

export const getLogin = async (data: Login) => api.post<LoginResponse>('/sessao-admin', data);

export const getValidaToken = async (token: string) => api.post<ResponseValidaToken>('/valida-token', { token });
