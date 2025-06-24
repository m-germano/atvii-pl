export type CPF = string;
export type RG = string;
export type Telefone = string;

export interface Pet {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  clienteId: number;
  clienteName: string;
}

export interface Cliente {
  id: number;
  nome: string;
  nomeSocial?: string;
  cpf: CPF;
  rg: RG; 
  dataCadastro: Date;
  telefones: Telefone[];
  pets?: Pet[];
  produtosConsumidos?: Produto[];
  servicosConsumidos?: Servico[];
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

export interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export type ClienteParaCadastro = Pick<
  Cliente,
  'nome' | 'nomeSocial' | 'cpf' | 'rg' | 'telefones'
>;
