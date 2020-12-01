import api from './Api';
import { Imagem } from '../Types';

export const sendImage = async (data: FormData) => api.post<Imagem>('/imagens', data);
