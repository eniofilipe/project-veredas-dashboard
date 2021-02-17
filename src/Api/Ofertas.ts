import api from './Api';
import { Oferta, Validade, PostValidadeProps, PostOfertaProps, PutValidadeProps, PutOfertaProps } from '../Types';

export const getProdutosOfertas = async () =>
  api.get<Oferta[]>('/oferta-admin', {
    params: {
      disponibilidade: 'ativa',
    },
  });

export const getOfertas = async () => api.get<Validade[]>('/validade-oferta');

export const setValidadeOferta = async (data: PostValidadeProps) => api.post<Validade>('/validade-oferta', data);

export const editValidadeOferta = async (data: PutValidadeProps) => api.put<Validade>('/valudade-oferta', data);

export const setOferta = async (data: PostOfertaProps) => api.post('/oferta', data);

export const editOferta = async (data: PutOfertaProps) => api.put('/oferta', data);

export const deleteOferta = async (id: number) => api.delete(`/oferta/${id}`);
