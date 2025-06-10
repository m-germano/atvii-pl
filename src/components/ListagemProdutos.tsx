import React from 'react';
import type { Produto } from '@/types/modelo';
import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface ListagemProdutosProps {
  produtos: Produto[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
}

export default class ListagemProdutos extends React.Component<ListagemProdutosProps> {
  render() {
    return (
      <Card className="border-gray-700 bg-gray-800 shadow-lg rounded-xl">
        {/* ... CardHeader anterior */}
        <CardContent className="p-0">
          <ul className="divide-y divide-gray-700">
            {this.props.produtos.length === 0 ? (
              <li className="py-8 text-center">
                <div className="text-gray-400">Nenhum produto cadastrado</div>
              </li>
            ) : (
              this.props.produtos.map((produto) => (
                <li
                  key={produto.id}
                  className="py-3 px-4 flex justify-between items-center hover:bg-gray-750 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    {/* ... ícone */}
                    <span className="font-medium text-white">
                      {produto.nome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 font-bold">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => this.props.onEditar(produto.id)}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => this.props.onExcluir(produto.id)}
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
