import api from './Api';
import { Administrador } from '../Types';

export const getAdministradores = async () => api.get<Administrador[]>('/administrador');

export const deleteAdministrador = async (id: number) => api.delete(`/administrador/${id}`);

export const postAdministriador = async (nome: string, email: string, password: string) =>
  api.post('/administrador', { nome, email, password });

export const putAdministriador = async (nome: string, email: string, oldPassword: string, password: string) =>
  api.put('/administrador', { nome, email, password, oldPassword });
