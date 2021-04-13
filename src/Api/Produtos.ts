import api from './Api';
import { PostProdutoProps, ResponseProduto, PutProdutoProps } from '../Types';

export const getProduto = async () => api.get<ResponseProduto>('/produto');

export const postProduto = async (data: PostProdutoProps) => api.post('/produto', data);

export const editProduto = async (data: PutProdutoProps) => api.put('/produto', data);

export const deleteProduto = async (id: number) => api.delete(`/produto/${id}`);
