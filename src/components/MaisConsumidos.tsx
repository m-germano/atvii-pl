import React from 'react';
import type { Cliente } from '@/types/modelo';

interface Props {
  clientes: Cliente[];
}

export default class MaisConsumidos extends React.Component<Props> {
  render() {
    const contagem: Record<string, number> = {};

    this.props.clientes.forEach((cliente) => {
      (cliente.produtosConsumidos ?? []).forEach((prod) => {
        contagem[prod.nome] = (contagem[prod.nome] || 0) + 1;
      });
      (cliente.servicosConsumidos ?? []).forEach((serv) => {
        contagem[serv.nome] = (contagem[serv.nome] || 0) + 1;
      });
    });

    const ordenado = Object.entries(contagem).sort((a, b) => b[1] - a[1]);

    return (
      <ul className="list-disc list-inside space-y-1">
        {ordenado.map(([nome, qtd], i) => (
          <li key={i}>
            {nome} - {qtd} vezes
          </li>
        ))}
      </ul>
    );
  }
}
