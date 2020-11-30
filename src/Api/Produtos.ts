import api from './Api';
import { Produto, PostProdutoProps, ResponseProduto } from '../Types';

export const getProduto = async () => api.get<ResponseProduto>('/produto');

export const postProduto = async (data: PostProdutoProps) => api.post('/produto', data);
