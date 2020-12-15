/* eslint-disable camelcase */
export interface Categoria {
  id: number;
  nome: string;
  isvalid: boolean;
}

export interface PostCategoriaProps {
  nome: string;
}

export interface PutCategoriaProps {
  categoria_id: number;
  isvalid: boolean;
}

export interface Imagem {
  url: string;
  path: string;
  id: number;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categorias: Categoria[];
  imagem: Imagem;
}

export interface ResponseProduto {
  produtos: Produto[];
}

export interface PostProdutoProps {
  nome: string;
  descricao: string;
  imagem_id: number;
  categorias: number[];
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: number;
  enderecos: {
    id: number;
    cep: number;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    referencia?: string;
  };
}

export interface PostClienteProps {
  nome: string;
  email: string;
  cpf: string;
  telefone: number;
  password: string;
  cep: number;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
}

export interface Administrador {
  id: number;
  nome: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  option: string;
  client: Administrador;
  token: string;
}

export interface Validade {
  id: number;
  validade: string;
  status: string;
}

export interface PutValidadeProps {
  validade_id: number;
  status: string;
  validade: string;
}

export interface PostValidadeProps {
  validade: string;
}

export interface Oferta {
  id: number;
  quantidade: number;
  valor_unitario: number;
  produtos: Produto;
  validade: Validade;
}

export interface PostOfertaProps {
  produto_id?: number;
  id?: number;
  quantidade: number;
  valor_unitario: number;
  validade_oferta_id: number;
}

export interface OfertaPedido {
  oferta_id: number;
  quantidade: number;
}

export interface Pedido {
  id: number;
  status: string;
  valor_frete: number;
  tipo_pagamento_id: number;
  tipo_frete_id: number;
  createdAt: Date;
  ofertas: {
    id: number;
    valor_unitario: number;
    validade_oferta_id: number;
    produtos: {
      id: number;
      nome: string;
      descricao: string;
      imagem_id: number;
      imagem: {
        url: string;
        path: string;
      };
    };
    oferta_pedidos: {
      quantidade: number;
    };
  };
  clientes: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: number;
    endereco_id: number;
    enderecos: {
      id: number;
      cep: number;
      estado: string;
      cidade: string;
      bairro: string;
      logradouro: string;
      numero: string;
      complemento: string;
      referencia: string;
    };
  };
  administrador: string;
  pagamento: {
    id: number;
    titulo: string;
    valor_frete: number;
  };
  total: number;
}

export interface PostPedidoProps {
  ofertas: OfertaPedido[];
  cliente_id: number;
  tipo_pagamento_id: number;
  valor_frete: number;
  tipo_frete_id: number;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: number;
  telefone: number;
  enderecos: {
    id: number;
    cep: number;
    estado: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    referencia: string;
  };
}

export interface ResponseUsuario {
  usuarios: Usuario[];
}
