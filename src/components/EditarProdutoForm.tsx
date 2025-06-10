import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Package, X } from 'lucide-react';
import type { Produto } from '@/types/modelo';

interface Props {
  produto: Produto | undefined;
  onSalvar: (dados: { nome?: string; preco?: number }) => void;
  onCancelar: () => void;
}

interface State {
  nome: string;
  preco: string;
}

export default class EditarProdutoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      nome: props.produto?.nome || '',
      preco: props.produto?.preco.toString() || '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preco = parseFloat(this.state.preco);

    if (!this.state.nome.trim()) {
      toast.error('Por favor, insira um nome para o produto');
      return;
    }

    if (isNaN(preco) || preco <= 0) {
      toast.error('Preço inválido. Deve ser um valor positivo');
      return;
    }

    this.props.onSalvar({
      nome: this.state.nome.trim(),
      preco: parseFloat(preco.toFixed(2)),
    });

    toast.success('Produto atualizado com sucesso!');
  };

  render() {
    return (
      <Card className="border border-gray-700 bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-400" />
              Editar Produto
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={this.props.onCancelar}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Atualizar Produto
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
