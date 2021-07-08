import api from './Api';
import { Frete } from '../Types';

export const getFrete = async () => api.get<Frete[]>('/frete');

export const putFrete = async (newValor: number) =>
  api.put('/frete/1', {
    nome: 'novonome',
    valor_frete: newValor,
  });
