import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Servico } from '@/types/modelo';

interface Props {
  servico: Servico;
  onSalvar: (dados: Partial<Servico>) => void;
  onCancelar: () => void;
}

interface State {
  nome: string;
  preco: number;
}

export default class EditarServicoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: props.servico.nome,
      preco: props.servico.preco,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: name === 'preco' ? Number(value) : value,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSalvar({
      nome: this.state.nome,
      preco: this.state.preco,
    });
  };

  render() {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-purple-400">
          Editar Serviço
        </h2>
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              name="nome"
              value={this.state.nome}
              onChange={this.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Preço</Label>
            <Input
              name="preco"
              type="number"
              value={this.state.preco}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-red-800 border-red-800"
              onClick={this.props.onCancelar}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
