import api from './Api';
import { Usuario } from '../Types';

export const getUsuarios = async () => api.get<Usuario[]>('/cliente');
