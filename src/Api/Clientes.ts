import api from './Api';
import { Cliente } from '../Types';

export const getClientes = async () => api.get<Cliente[]>('/cliente');
