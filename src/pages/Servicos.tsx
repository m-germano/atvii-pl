import React from 'react';
import ServicoForm from '@/components/ServicoForm';
import ListagemServicos from '@/components/ListagemServicos';
import type { Servico } from '@/types/modelo';
import EditarServicoForm from '@/components/EditarServicoForm';

interface ServicosProps {
  servicos: Servico[];
  onAdicionarServico: (servico: Omit<Servico, 'id'>) => void;
  onEditarServico: (id: number, dados: Partial<Servico>) => void;
  onExcluirServico: (id: number) => void;
}

interface ServicosState {
  editandoId: number | null;
}

export default class Servicos extends React.Component<
  ServicosProps,
  ServicosState
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
    const servicoEmEdicao = this.state.editandoId
      ? this.props.servicos.find((s) => s.id === this.state.editandoId)
      : null;

    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {this.state.editandoId && servicoEmEdicao ? (
            <EditarServicoForm
              servico={servicoEmEdicao}
              onSalvar={(dados) => {
                this.props.onEditarServico(this.state.editandoId!, dados);
                this.cancelarEdicao();
              }}
              onCancelar={this.cancelarEdicao}
            />
          ) : (
            <ServicoForm onAdicionar={this.props.onAdicionarServico} />
          )}

          <ListagemServicos
            servicos={this.props.servicos}
            onEditar={this.iniciarEdicao}
            onExcluir={this.props.onExcluirServico}
          />
        </div>
      </div>
    );
  }
}
