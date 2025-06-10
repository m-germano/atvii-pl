import React from 'react';
import type { Cliente } from '@/types/modelo';

interface Props {
  clientes: Cliente[];
}

export default class MaisConsumidosPorTipoRaca extends React.Component<Props> {
  render() {
    const contagem: Record<string, Record<string, Record<string, number>>> = {};

    this.props.clientes.forEach((cliente) => {
      cliente.pets?.forEach((pet) => {
        const tipo = pet.tipo || 'Desconhecido';
        const raca = pet.raca || 'Desconhecida';

        // Garantir estrutura
        contagem[tipo] ??= {};
        contagem[tipo][raca] ??= {};

        // Contar produtos consumidos
        (cliente.produtosConsumidos ?? []).forEach((produto) => {
          contagem[tipo][raca][produto.nome] =
            (contagem[tipo][raca][produto.nome] || 0) + 1;
        });

        // Contar serviços consumidos
        (cliente.servicosConsumidos ?? []).forEach((servico) => {
          contagem[tipo][raca][servico.nome] =
            (contagem[tipo][raca][servico.nome] || 0) + 1;
        });
      });
    });

    return (
      <div className="space-y-6">
        {Object.entries(contagem).map(([tipo, racas]) => (
          <div key={tipo}>
            <h2 className="text-xl font-bold text-purple-400 mb-2">
              Tipo: {tipo}
            </h2>
            {Object.entries(racas).map(([raca, itens]) => (
              <div key={raca} className="ml-4 mb-4">
                <h3 className="text-md font-semibold text-purple-300">
                  Raça: {raca}
                </h3>
                <ul className="list-disc list-inside text-gray-100">
                  {Object.entries(itens)
                    .sort((a, b) => b[1] - a[1])
                    .map(([item, qtd], i) => (
                      <li key={i}>
                        {item} – {qtd} vezes
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
