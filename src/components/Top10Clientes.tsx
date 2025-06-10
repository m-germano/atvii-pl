import React from 'react';
import type { Cliente } from '@/types/modelo';

interface Props {
  clientes: Cliente[];
}

export default class Top10Clientes extends React.Component<Props> {
  render() {
    const ordenado = this.props.clientes
      .slice()
      .sort((a, b) => {
        const totalA =
          (a.produtosConsumidos ?? []).length +
          (a.servicosConsumidos ?? []).length;

        const totalB =
          (b.produtosConsumidos ?? []).length +
          (b.servicosConsumidos ?? []).length;
        return totalB - totalA;
      })
      .slice(0, 10);

    return (
      <ul className="list-disc list-inside space-y-1">
        {ordenado.map((cliente, index) => (
          <li key={index}>
            {cliente.nome} -{' '}
            {(cliente.produtosConsumidos ?? []).length +
              (cliente.servicosConsumidos ?? []).length}{' '}
            itens
          </li>
        ))}
      </ul>
    );
  }
}
