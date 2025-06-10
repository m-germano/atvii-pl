import React from 'react';
import type { Cliente } from '@/types/modelo';

interface Props {
  clientes: Cliente[];
}

export default class Top5ClientesValor extends React.Component<Props> {
  render() {
    const ordenado = this.props.clientes
      .slice()
      .sort((a, b) => {
        const valorA =
          (a.produtosConsumidos ?? []).reduce((s, p) => s + p.preco, 0) +
          (a.servicosConsumidos ?? []).reduce((s, s1) => s + s1.preco, 0);

        const valorB =
          (b.produtosConsumidos ?? []).reduce((s, p) => s + p.preco, 0) +
          (b.servicosConsumidos ?? []).reduce((s, s1) => s + s1.preco, 0);
        return valorB - valorA;
      })
      .slice(0, 5);

    return (
      <ul className="list-disc list-inside space-y-1">
        {ordenado.map((cliente, index) => {
          const total =
            (cliente.produtosConsumidos ?? []).reduce(
              (s, p) => s + p.preco,
              0,
            ) +
            (cliente.servicosConsumidos ?? []).reduce(
              (s, s1) => s + s1.preco,
              0,
            );
          return (
            <li key={index}>
              {cliente.nome} - R$ {total.toFixed(2)}
            </li>
          );
        })}
      </ul>
    );
  }
}
