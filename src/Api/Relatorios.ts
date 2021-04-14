import api from './Api';
import { DataRelatorioPedidos, ItemRelatorioProdutos } from '../Types';

export const getRelatorioPedidos = async (id: number) => api.get<DataRelatorioPedidos[]>(`/relatorio/${id}`);

export const getRelatorioProdutos = async (id: number) =>
  api.get<ItemRelatorioProdutos[]>(`/relatorio-semanal-produtos/${id}`);
