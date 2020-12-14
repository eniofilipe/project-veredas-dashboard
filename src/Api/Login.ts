import api from './Api';
import { Login, LoginResponse } from '../Types';

export const getLogin = async (data: Login) => api.post<LoginResponse>('/sessao', data);
