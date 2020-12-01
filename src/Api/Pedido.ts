import api from './Api';
import { PostPedidoProps } from '../Types';

export const postPedido = async (data: PostPedidoProps) => api.post('/pedido', data);
