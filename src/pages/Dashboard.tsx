import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClienteForm from '@/components/ClienteForm';
import RegistroConsumo from '@/components/RegistroConsumo';
import Estatisticas from '@/pages/Estatisticas';
import ListagemClientes from '@/components/ListagemClientes';
import type { Cliente, Pet, Produto, Servico } from '@/types/modelo';
import Produtos from './Produtos';
import Servicos from './Servicos';
import Pets from './Pets';
import type { ClienteParaCadastro } from '@/types/modelo';

interface DashboardProps {
  clientes: Cliente[];
  produtos: Produto[];
  servicos: Servico[];
  pets: Pet[];
  onAdicionarCliente: (cliente: ClienteParaCadastro) => void;
  onAdicionarProduto: (produto: Omit<Produto, 'id'>) => void;
  onEditarProduto: (id: number, dados: Partial<Produto>) => void;
  onExcluirProduto: (id: number) => void;
  onAdicionarServico: (servico: Omit<Servico, 'id'>) => void;
  onEditarServico: (id: number, dados: Partial<Servico>) => void;
  onExcluirServico: (id: number) => void;
  onRegistrarConsumo: (
    clienteId: number,
    tipo: 'produto' | 'servico',
    itemId: number,
  ) => void;
  onEditarCliente: (id: number, dados: Partial<Cliente>) => void;
  onExcluirCliente: (id: number) => void;
  onAdicionarPet: (clienteId: number, pet: Pet) => void;
  onEditarPet: (
    clienteId: number,
    petIndex: number,
    dados: Partial<Pet>,
  ) => void;
  onExcluirPet: (clienteId: number, petIndex: number) => void;
}

export default class Dashboard extends React.Component<DashboardProps> {
  render() {
    const {
      clientes,
      produtos,
      servicos,
      onAdicionarCliente,
      onRegistrarConsumo,
    } = this.props;

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 pt-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Dashboard PETLOVERS
            </h1>
            <p className="text-gray-400">Gerencie clientes e consumo</p>
          </header>

          <Tabs defaultValue="clientes" className="w-full">
            <TabsList className="flex w-full bg-gray-800 border border-gray-700 rounded-xl p-1 mb-6">
              <TabsTrigger
                value="clientes"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Clientes
              </TabsTrigger>
              <TabsTrigger
                value="pets"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Pets
              </TabsTrigger>
              <TabsTrigger
                value="produtos"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Produtos
              </TabsTrigger>
              <TabsTrigger
                value="servicos"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Serviços
              </TabsTrigger>
              <TabsTrigger
                value="consumo"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Registrar Consumo
              </TabsTrigger>
              <TabsTrigger
                value="estatisticas"
                className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg py-3 px-4 rounded-xl transition-all duration-300 hover:bg-gray-700"
              >
                Estatísticas
              </TabsTrigger>
            </TabsList>
            {/* Adicione esses novos TabsContent */}
            <TabsContent value="produtos" className="mt-4">
              <Produtos
                produtos={this.props.produtos}
                onAdicionarProduto={this.props.onAdicionarProduto}
                onEditarProduto={this.props.onEditarProduto}
                onExcluirProduto={this.props.onExcluirProduto}
              />
            </TabsContent>
            <TabsContent value="servicos" className="mt-4">
              <Servicos
                servicos={this.props.servicos}
                onAdicionarServico={this.props.onAdicionarServico}
                onEditarServico={this.props.onEditarServico}
                onExcluirServico={this.props.onExcluirServico}
              />
            </TabsContent>
            <TabsContent value="pets" className="mt-4">
              <Pets
                pets={this.props.pets}
                clientes={this.props.clientes}
                onAdicionarPet={this.props.onAdicionarPet}
                onEditarPet={this.props.onEditarPet}
                onExcluirPet={this.props.onExcluirPet}
              />
            </TabsContent>

            <TabsContent value="clientes" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClienteForm onAdicionar={onAdicionarCliente} />
                <ListagemClientes
                  clientes={clientes}
                  onEditar={this.props.onEditarCliente}
                  onExcluir={this.props.onExcluirCliente}
                />
              </div>
            </TabsContent>

            <TabsContent value="consumo" className="mt-4">
              <RegistroConsumo
                clientes={clientes}
                produtos={produtos}
                servicos={servicos}
                onRegistrar={(clienteNome, tipo, itemNome) => {
                  // Encontre os IDs correspondentes
                  const cliente = clientes.find((c) => c.nome === clienteNome);
                  const item =
                    tipo === 'produto'
                      ? produtos.find((p) => p.nome === itemNome)
                      : servicos.find((s) => s.nome === itemNome);

                  if (cliente && item) {
                    onRegistrarConsumo(cliente.id, tipo, item.id);
                  }
                }}
              />
            </TabsContent>
            <TabsContent value="estatisticas" className="mt-4">
              <Estatisticas clientes={clientes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
}
