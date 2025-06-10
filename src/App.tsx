import React from 'react';
import Dashboard from '@/pages/Dashboard';
import type { Cliente, Pet, Produto, Servico } from '@/types/modelo';

interface AppState {
  clientes: Cliente[];
  produtos: Produto[];
  servicos: Servico[];
  nextId: number;
  pets: Pet[];
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clientes: [],
      produtos: [
        { id: 1, nome: 'Shampoo Antipulgas', preco: 29.9 },
        { id: 2, nome: 'Ração Premium 10kg', preco: 89.9 },
        { id: 3, nome: 'Coleira Refletiva', preco: 45.0 },
      ],
      servicos: [
        { id: 4, nome: 'Banho e Tosa', preco: 49.9 },
        { id: 5, nome: 'Consulta Veterinária', preco: 120.0 },
        { id: 6, nome: 'Vacinação', preco: 80.0 },
      ],
      nextId: 7,
      pets: [],
    };
  }

  adicionarCliente = (
    cliente: Pick<Cliente, 'nome' | 'nomeSocial' | 'cpf' | 'rg' | 'telefones'>,
  ) => {
    const novoCliente: Cliente = {
      ...cliente,
      id: this.state.nextId,
      dataCadastro: new Date(),
      produtosConsumidos: [],
      servicosConsumidos: [],
    };

    this.setState((prevState) => ({
      clientes: [...prevState.clientes, novoCliente],
      nextId: prevState.nextId + 1,
    }));
  };

  editarCliente = (id: number, dados: Partial<Cliente>) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.map((cliente) =>
        cliente.id === id ? { ...cliente, ...dados } : cliente,
      ),
    }));
  };

  excluirCliente = (id: number) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.filter((cliente) => cliente.id !== id),
    }));
  };

  adicionarProduto = (produto: Omit<Produto, 'id'>) => {
    const novoProduto: Produto = {
      ...produto,
      id: this.state.nextId,
    };

    this.setState((prevState) => ({
      produtos: [...prevState.produtos, novoProduto],
      nextId: prevState.nextId + 1,
    }));
  };

  editarProduto = (id: number, dadosAtualizados: Partial<Produto>) => {
    this.setState((prevState) => ({
      produtos: prevState.produtos.map((produto) =>
        produto.id === id ? { ...produto, ...dadosAtualizados } : produto,
      ),
    }));
  };

  excluirProduto = (id: number) => {
    this.setState((prevState) => ({
      produtos: prevState.produtos.filter((produto) => produto.id !== id),
    }));
  };

  adicionarServico = (servico: Omit<Servico, 'id'>) => {
    const novoServico: Servico = {
      ...servico,
      id: this.state.nextId,
    };

    this.setState((prevState) => ({
      servicos: [...prevState.servicos, novoServico],
      nextId: prevState.nextId + 1,
    }));
  };

  editarServico = (id: number, dadosAtualizados: Partial<Servico>) => {
    this.setState((prevState) => ({
      servicos: prevState.servicos.map((servico) =>
        servico.id === id ? { ...servico, ...dadosAtualizados } : servico,
      ),
    }));
  };

  excluirServico = (id: number) => {
    this.setState((prevState) => ({
      servicos: prevState.servicos.filter((servico) => servico.id !== id),
    }));
  };

  registrarConsumo = (
    clienteId: number,
    tipo: 'produto' | 'servico',
    itemId: number,
  ) => {
    this.setState((prevState) => {
      const clientesAtualizados = prevState.clientes.map((cliente) => {
        if (cliente.id === clienteId) {
          if (tipo === 'produto') {
            const produto = prevState.produtos.find((p) => p.id === itemId);
            return produto
              ? {
                  ...cliente,
                  produtosConsumidos: [
                    ...(cliente.produtosConsumidos ?? []),
                    produto,
                  ],
                }
              : cliente;
          } else {
            const servico = prevState.servicos.find((s) => s.id === itemId);
            return servico
              ? {
                  ...cliente,
                  servicosConsumidos: [
                    ...(cliente.servicosConsumidos ?? []),
                    servico,
                  ],
                }
              : cliente;
          }
        }
        return cliente;
      });

      return { clientes: clientesAtualizados };
    });
  };

  adicionarPet = (clienteId: number, pet: Pet) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.map((cliente) =>
        cliente.id === clienteId
          ? { ...cliente, pets: [...(cliente.pets || []), pet] }
          : cliente,
      ),
    }));
  };

  editarPet = (clienteId: number, petIndex: number, dados: Partial<Pet>) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.map((cliente) =>
        cliente.id === clienteId
          ? {
              ...cliente,
              pets: cliente.pets?.map((p, i) =>
                i === petIndex ? { ...p, ...dados } : p,
              ),
            }
          : cliente,
      ),
    }));
  };

  excluirPet = (clienteId: number, petIndex: number) => {
    this.setState((prevState) => ({
      clientes: prevState.clientes.map((cliente) =>
        cliente.id === clienteId
          ? {
              ...cliente,
              pets: cliente.pets?.filter((_, i) => i !== petIndex),
            }
          : cliente,
      ),
    }));
  };

  render() {
    return (
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Dashboard
          clientes={this.state.clientes}
          produtos={this.state.produtos}
          servicos={this.state.servicos}
          pets={this.state.clientes.flatMap((cliente) => cliente.pets || [])}
          onAdicionarCliente={this.adicionarCliente}
          onEditarCliente={this.editarCliente}
          onExcluirCliente={this.excluirCliente}
          onAdicionarProduto={this.adicionarProduto}
          onEditarProduto={this.editarProduto}
          onExcluirProduto={this.excluirProduto}
          onAdicionarServico={this.adicionarServico}
          onEditarServico={this.editarServico}
          onExcluirServico={this.excluirServico}
          onRegistrarConsumo={this.registrarConsumo}
          onAdicionarPet={this.adicionarPet}
          onEditarPet={this.editarPet}
          onExcluirPet={this.excluirPet}
        />
      </div>
    );
  }
}

export default App;
