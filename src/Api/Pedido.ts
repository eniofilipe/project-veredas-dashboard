import api from './Api';
import { PostPedidoProps, Pedido, TipoPagamento, OfertaPedido } from '../Types';

export const getPedidos = async () => api.get<Pedido[]>('/pedido');

export const postPedido = async (data: PostPedidoProps) => api.post('/pedido', data);

export const getTiposPagamento = async () => api.get<TipoPagamento[]>('tipo-pagamento');

export const putPedido = async (id: number, ofertas: OfertaPedido[]) =>
  api.put(`/pedido/${id}`, {
    ofertas,
  });

export const cancelPedido = async (id: number) => api.delete(`/pedido/${id}`);
