import api from './Api';
import { Dados } from '../Types';

export const getInformacao = async () => api.get<Dados>('/estatisticas');
