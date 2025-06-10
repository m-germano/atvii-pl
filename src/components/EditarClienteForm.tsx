import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import type { Cliente } from '@/types/modelo';

interface Props {
  cliente: Cliente;
  onSalvar: (dados: Partial<Cliente>) => void;
  onCancelar: () => void;
}

export default class EditarClienteForm extends React.Component<Props, Cliente> {
  constructor(props: Props) {
    super(props);
    this.state = { ...props.cliente };
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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, nome, nomeSocial, cpf, rg, telefones } = this.state;
    this.props.onSalvar({ id, nome, nomeSocial, cpf, rg, telefones });
  };

  render() {
    return (
      <Card className="border-gray-700 bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-yellow-400">Editar Cliente</CardTitle>
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
                value={this.state.nomeSocial ?? ''}
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

            <div className="flex justify-between mt-4">
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Salvar
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={this.props.onCancelar}
                className="text-gray-400 hover:text-red-500"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
