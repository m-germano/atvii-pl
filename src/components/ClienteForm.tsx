import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { Cliente, Telefone, RG } from '@/types/modelo';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface ClienteParcial {
  nome: string;
  nomeSocial?: string;
  cpf: string;
  rg: RG;
  telefones: Telefone[];
}

interface Props {
  onAdicionar: (
    cliente: Omit<
      Cliente,
      | 'id'
      | 'dataCadastro'
      | 'pets'
      | 'produtosConsumidos'
      | 'servicosConsumidos'
    >,
  ) => void;
}

export default class ClienteForm extends React.Component<
  Props,
  ClienteParcial
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: '',
      nomeSocial: '',
      cpf: '',
      rg: '',
      telefones: [''],
    };
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: 'telefones',
  ) => {
    const { name, value } = e.target;

    if (field && index !== undefined) {
      const list = [...this.state[field]];
      list[index] = value;
      this.setState({ ...this.state, [field]: list });
    } else {
      this.setState({ ...this.state, [name]: value } as any);
    }
  };

  addField = (field: 'telefones') => {
    this.setState({ ...this.state, [field]: [...this.state[field], ''] });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onAdicionar(this.state);
    this.setState({
      nome: '',
      nomeSocial: '',
      cpf: '',
      rg: '',
      telefones: [''],
    });
  };

  render() {
    return (
      <Card className="border-gray-700 bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-purple-400">
            Cadastrar Novo Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Nome</label>
              <Input
                name="nome"
                value={this.state.nome}
                onChange={this.handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Nome Social</label>
              <Input
                name="nomeSocial"
                value={this.state.nomeSocial}
                onChange={this.handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">CPF</label>
              <Input
                name="cpf"
                value={this.state.cpf}
                onChange={this.handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">RG</label>
              <Input
                name="rg"
                value={this.state.rg}
                onChange={this.handleChange}
              />
            </div>

            {this.state.telefones.map((tel, index) => (
              <div className="space-y-2" key={index}>
                <label className="text-sm">{`Telefone ${index + 1}`}</label>
                <Input
                  value={tel}
                  onChange={(e) => this.handleChange(e, index, 'telefones')}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => this.addField('telefones')}
              className="border-green-700 bg-green-700 hover:bg-green-500 hover:text-amber-50"
            >
              + Adicionar Telefone
            </Button>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
