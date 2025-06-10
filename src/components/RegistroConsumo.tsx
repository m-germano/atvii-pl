import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { Cliente, Produto, Servico } from '@/types/modelo';

interface Props {
  clientes: Cliente[];
  produtos: Produto[];
  servicos: Servico[];
  onRegistrar: (
    clienteNome: string,
    tipo: 'produto' | 'servico',
    itemNome: string,
  ) => void;
}

interface State {
  cliente: string;
  tipo: 'produto' | 'servico';
  item: string;
}

export default class RegistroConsumo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const primeiroItem = props.produtos[0]?.nome || '';
    this.state = {
      cliente: props.clientes[0]?.nome || '',
      tipo: 'produto',
      item: primeiroItem,
    };
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'tipo') {
      const novaLista =
        value === 'produto' ? this.props.produtos : this.props.servicos;
      this.setState({
        tipo: value as 'produto' | 'servico',
        item: novaLista[0]?.nome || '',
      });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.state.cliente || !this.state.item) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.props.onRegistrar(
      this.state.cliente,
      this.state.tipo,
      this.state.item,
    );
    this.setState({
      cliente: '',
      item: this.props.produtos[0]?.nome || '',
      tipo: 'produto',
    });
  };

  render() {
    const listaAtual =
      this.state.tipo === 'produto' ? this.props.produtos : this.props.servicos;

    return (
      <Card className="border-gray-700 bg-gray-800 max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-purple-400">Registrar Consumo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Cliente</Label>
              <select
                name="cliente"
                value={this.state.cliente}
                onChange={this.handleChange}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecione um cliente</option>
                {this.props.clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.nome}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Tipo de Consumo</Label>
              <select
                name="tipo"
                value={this.state.tipo}
                onChange={this.handleChange}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="produto">Produto</option>
                <option value="servico">Serviço</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Item</Label>
              <select
                name="item"
                value={this.state.item}
                onChange={this.handleChange}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                {listaAtual.map((opcao) => (
                  <option key={opcao.id} value={opcao.nome}>
                    {opcao.nome} — R$ {opcao.preco.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}
