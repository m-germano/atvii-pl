import React from 'react';
import type { Cliente } from '@/types/modelo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditarClienteForm from './EditarClienteForm';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';

interface Props {
  clientes: Cliente[];
  onEditar: (id: number, dados: Partial<Cliente>) => void;
  onExcluir: (id: number) => void;
}

interface State {
  clienteEmEdicao: Cliente | null;
}

export default class ListagemClientes extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clienteEmEdicao: null,
    };
  }

  iniciarEdicao = (cliente: Cliente) => {
    this.setState({ clienteEmEdicao: cliente });
  };

  cancelarEdicao = () => {
    this.setState({ clienteEmEdicao: null });
  };

  salvarEdicao = (dados: Partial<Cliente>) => {
    if (this.state.clienteEmEdicao) {
      this.props.onEditar(this.state.clienteEmEdicao.id, dados);
      this.setState({ clienteEmEdicao: null });
    }
  };

  render() {
    const { clientes, onExcluir } = this.props;
    const { clienteEmEdicao } = this.state;

    return (
      <Card className="border-gray-700 bg-gray-800 shadow-lg rounded-xl">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-purple-400 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span>Clientes Cadastrados</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {clienteEmEdicao ? (
            <EditarClienteForm
              cliente={clienteEmEdicao}
              onSalvar={this.salvarEdicao}
              onCancelar={this.cancelarEdicao}
            />
          ) : (
            <ul className="divide-y divide-gray-700">
              {clientes.length === 0 ? (
                <li className="py-8 text-center">
                  <div className="text-gray-400">Nenhum cliente cadastrado</div>
                  <div className="text-sm text-gray-500 mt-2">
                    Adicione clientes usando o formulário ao lado
                  </div>
                </li>
              ) : (
                clientes.map((c, i) => (
                  <li
                    key={i}
                    className="py-4 px-4 hover:bg-gray-750 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-white">{c.nome}</div>
                        <div className="text-sm text-gray-300">
                          CPF: {c.cpf}
                        </div>
                        {c.nomeSocial && (
                          <div className="text-sm text-gray-400">
                            Nome Social: {c.nomeSocial}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-4 text-center">
                        <div>
                          <div className="text-xs text-gray-400">Produtos</div>
                          <div className="text-purple-400 font-bold">
                            {(c.produtosConsumidos ?? []).length}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Serviços</div>
                          <div className="text-purple-400 font-bold">
                            {(c.servicosConsumidos ?? []).length}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => this.iniciarEdicao(c)}
                          className="text-gray-400 hover:text-yellow-400"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onExcluir(c.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-blue-400"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="text-purple-400">
                                Informações do Cliente
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2">
                              <p>
                                <strong>Nome:</strong> {c.nome}
                              </p>
                              {c.nomeSocial && (
                                <p>
                                  <strong>Nome Social:</strong> {c.nomeSocial}
                                </p>
                              )}
                              <p>
                                <strong>CPF:</strong> {c.cpf}
                              </p>
                              <p>
                                <strong>RG:</strong> {c.rg}
                              </p>
                              <p>
                                <strong>Telefones:</strong>{' '}
                                {c.telefones?.join(', ')}
                              </p>
                              <p>
                                <strong>Produtos Consumidos:</strong>{' '}
                                {c.produtosConsumidos &&
                                c.produtosConsumidos.length > 0
                                  ? c.produtosConsumidos
                                      .map((p) => p.nome)
                                      .join(', ')
                                  : 'Nenhum'}
                              </p>
                              <p>
                                <strong>Serviços Consumidos:</strong>{' '}
                                {c.servicosConsumidos &&
                                c.servicosConsumidos.length > 0
                                  ? c.servicosConsumidos
                                      .map((s) => s.nome)
                                      .join(', ')
                                  : 'Nenhum'}
                              </p>
                              <p>
                                <strong>Pets:</strong>{' '}
                                {c.pets && c.pets.length > 0 ? (
                                  <ul className="list-disc list-inside text-sm text-gray-300 mt-1 ml-4 space-y-1">
                                    {c.pets.map((pet, idx) => (
                                      <li key={idx}>
                                        <span className="text-white">
                                          {pet.nome}
                                        </span>{' '}
                                        — {pet.tipo}, {pet.raca}, {pet.genero}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  'Nenhum pet cadastrado'
                                )}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  }
}
