import React from 'react';
import Top10Clientes from '@/components/Top10Clientes';
import Top5ClientesValor from '@/components/Top5ClientesValor';
import MaisConsumidos from '@/components/MaisConsumidos';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Cliente } from '../types/modelo';
import MaisConsumidosPorTipoRaca from '@/components/MaisConsumidosPorTipoRaca';

interface Props {
  clientes: Cliente[];
}

export default class Estatisticas extends React.Component<Props> {
  render() {
    return (
      <div className="space-y-6 text-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Estatísticas Gerais
          </h1>
          <p className="text-gray-400">Dados de consumo e clientes</p>
        </div>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-purple-400">
              Top 10 Clientes por Quantidade
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-100">
            <Top10Clientes clientes={this.props.clientes} />
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-purple-400">
              Top 5 Clientes por Valor
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-100">
            <Top5ClientesValor clientes={this.props.clientes} />
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-purple-400">
              Produtos e Serviços Mais Consumidos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-100">
            <MaisConsumidos clientes={this.props.clientes} />
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-purple-400">
              Itens Mais Consumidos por Tipo e Raça de Pet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-100">
            <MaisConsumidosPorTipoRaca clientes={this.props.clientes} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
