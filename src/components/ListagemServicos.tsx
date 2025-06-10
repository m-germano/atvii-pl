import React from 'react';
import type { Servico } from '@/types/modelo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface ListagemServicosProps {
  servicos: Servico[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
}

export default class ListagemServicos extends React.Component<ListagemServicosProps> {
  render() {
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
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Serviços Cadastrados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-gray-700">
            {this.props.servicos.length === 0 ? (
              <li className="py-8 text-center">
                <div className="text-gray-400">Nenhum serviço cadastrado</div>
              </li>
            ) : (
              this.props.servicos.map((servico) => (
                <li
                  key={servico.id}
                  className="py-3 px-4 flex justify-between items-center hover:bg-gray-750 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="font-medium text-white">
                      {servico.nome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-bold">
                      R$ {servico.preco.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => this.props.onEditar(servico.id)}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => this.props.onExcluir(servico.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    );
  }
}
