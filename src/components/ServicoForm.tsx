import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CircleDollarSign, ClipboardList } from 'lucide-react';

interface State {
  nome: string;
  preco: string;
}

interface Props {
  onAdicionar: (servico: { nome: string; preco: number }) => void;
}

export default class ServicoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { nome: '', preco: '' };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preco = parseFloat(this.state.preco);

    if (!this.state.nome.trim()) {
      toast.error('Por favor, insira um nome para o serviço');
      return;
    }

    if (isNaN(preco) || preco <= 0) {
      toast.error('Preço inválido. Deve ser um valor positivo');
      return;
    }

    this.props.onAdicionar({
      nome: this.state.nome.trim(),
      preco: parseFloat(preco.toFixed(2)),
    });

    this.setState({ nome: '', preco: '' });
    toast.success('Serviço cadastrado com sucesso!');
  };

  render() {
    return (
      <Card className="border border-gray-700 bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-400" />
            Cadastro de Serviço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium">
                Nome do Serviço
              </label>
              <Input
                id="nome"
                name="nome"
                placeholder="Ex: Banho e Tosa"
                value={this.state.nome}
                onChange={this.handleChange}
                className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="preco" className="block text-sm font-medium">
                Preço (R$)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <CircleDollarSign className="w-4 h-4" />
                </span>
                <Input
                  id="preco"
                  name="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={this.state.preco}
                  onChange={this.handleChange}
                  className="pl-8 bg-gray-700 border-gray-600 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Cadastrar Serviço
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
