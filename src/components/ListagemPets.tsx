import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Pet } from '@/types/modelo';
import EditarPetForm from './EditarPetForm';

interface Props {
  pets: Pet[];
  onEditar: (index: number, dados: Partial<Pet>) => void;
  onExcluir: (index: number) => void;
}

interface State {
  petEditando: number | null;
}

export default class ListagemPets extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      petEditando: null,
    };
  }

  iniciarEdicao = (index: number) => {
    this.setState({ petEditando: index });
  };

  cancelarEdicao = () => {
    this.setState({ petEditando: null });
  };

  salvarEdicao = (dados: Partial<Pet>) => {
    if (this.state.petEditando !== null) {
      this.props.onEditar(this.state.petEditando, dados);
      this.setState({ petEditando: null });
    }
  };

  render() {
    const { pets, onExcluir } = this.props;
    const { petEditando } = this.state;

    return (
      <div className="space-y-4">
        {pets.map((pet, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded-lg p-4 bg-gray-800"
          >
            {petEditando === i ? (
              <EditarPetForm
                pet={pet}
                onSalvar={this.salvarEdicao}
                onCancelar={this.cancelarEdicao}
              />
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{pet.nome}</div>
                  <div className="text-sm text-gray-400">
                    Espécie: {pet.tipo} | Raça: {pet.raca} | Gênero:{' '}
                    {pet.genero}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Cliente: {pet.clienteName}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => this.iniciarEdicao(i)}
                  >
                    <Pencil className="h-4 w-4 text-yellow-400" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onExcluir(i)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
