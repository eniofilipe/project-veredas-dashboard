import api from './Api';
import { Categoria, PostCategoriaProps, PutCategoriaProps } from '../Types';

export const getCategorias = async () => api.get<Categoria[]>('/categoria-admin');

export const postCategoria = async (data: PostCategoriaProps) => api.post('/categoria', data);

export const putCategoria = async (data: PutCategoriaProps) => api.put('/categoria', data);
