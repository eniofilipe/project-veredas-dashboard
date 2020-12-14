import api from './Api';
import { PostPedidoProps, Pedido } from '../Types';

export const getPedidos = async () => api.get<Pedido[]>('/pedido');

export const postPedido = async (data: PostPedidoProps) => api.post('/pedido', data);
