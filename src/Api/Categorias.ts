import api from './Api';
import { Categoria, PostCategoriaProps, PutCategoriaProps } from '../Types';

export const getCategorias = async () => api.get<Categoria[]>('/categoria-admin');

export const postCategoria = async (data: PostCategoriaProps) => api.post('/categoria', data);

export const deleteCategoria = async (id: number) => api.delete(`/categoria/${id}`);

// eslint-disable-next-line camelcase
export const editCategoria = async (nome: string, categoria_id: number, isvalid: boolean) =>
  api.put('/categoria', { nome, categoria_id, isvalid });

// export const getCategoria = async () => api.get<Categoria>('/categoria');
