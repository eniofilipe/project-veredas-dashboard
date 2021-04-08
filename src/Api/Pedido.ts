import api from './Api';
import { PostPedidoProps, Pedido, TipoPagamento } from '../Types';

export const getPedidos = async () => api.get<Pedido[]>('/pedido');

export const postPedido = async (data: PostPedidoProps) => api.post('/pedido', data);

export const getTiposPagamento = async () => api.get<TipoPagamento[]>('tipo-pagamento');
