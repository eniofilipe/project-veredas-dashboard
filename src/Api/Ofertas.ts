import api from './Api';
import { Oferta, Validade, PostValidadeProps, PostOfertaProps } from '../Types';

export const getProdutosOfertas = async () =>
  api.get<Oferta[]>('/oferta', {
    params: {
      disponibilidade: 'ativa',
    },
  });

export const getOfertas = async () => api.get<Validade[]>('/validade-oferta');

export const setValidadeOferta = async (data: PostValidadeProps) => api.post<Validade>('/validade-oferta', data);

export const setOferta = async (data: PostOfertaProps) => api.post('/oferta', data);

export const getValidadeOferta = async () => api.get<Validade>('/validade-oferta');

export const putOferta = async (data: PostOfertaProps) => api.put('/oferta', data);
