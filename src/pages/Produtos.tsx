import React from 'react';
import ProdutoForm from '@/components/ProdutoForm';
import ListagemProdutos from '@/components/ListagemProdutos';
import type { Produto } from '@/types/modelo';
import EditarProdutoForm from '@/components/EditarProdutoForm';

interface ProdutosProps {
  produtos: Produto[];
  onAdicionarProduto: (produto: Omit<Produto, 'id'>) => void;
  onEditarProduto: (id: number, dados: Partial<Produto>) => void;
  onExcluirProduto: (id: number) => void;
}

interface ProdutosState {
  editandoId: number | null;
}

export default class Produtos extends React.Component<
  ProdutosProps,
  ProdutosState
> {
  state = {
    editandoId: null,
  };

  iniciarEdicao = (id: number) => {
    this.setState({ editandoId: id });
  };

  cancelarEdicao = () => {
    this.setState({ editandoId: null });
  };

  render() {
    const produtoEmEdicao = this.state.editandoId
      ? this.props.produtos.find((p) => p.id === this.state.editandoId)
      : null;

    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {this.state.editandoId && produtoEmEdicao ? (
            <EditarProdutoForm
              produto={produtoEmEdicao}
              onSalvar={(dados) => {
                this.props.onEditarProduto(this.state.editandoId!, dados);
                this.cancelarEdicao();
              }}
              onCancelar={this.cancelarEdicao}
            />
          ) : (
            <ProdutoForm onAdicionar={this.props.onAdicionarProduto} />
          )}

          <ListagemProdutos
            produtos={this.props.produtos}
            onEditar={this.iniciarEdicao}
            onExcluir={this.props.onExcluirProduto}
          />
        </div>
      </div>
    );
  }
}
