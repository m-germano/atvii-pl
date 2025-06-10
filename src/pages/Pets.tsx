import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { Cliente, Pet } from '@/types/modelo';
import EditarPetForm from '@/components/EditarPetForm';
import PetForm from '@/components/PetForm';

interface Props {
  pets: Pet[];
  clientes: Cliente[];
  onAdicionarPet: (clienteId: number, pet: Pet) => void;
  onEditarPet: (
    clienteId: number,
    petIndex: number,
    dados: Partial<Pet>,
  ) => void;
  onExcluirPet: (clienteId: number, petIndex: number) => void;
}

interface State {
  editandoIndex: number | null;
}

export default class Pets extends React.Component<Props, State> {
  state: State = {
    editandoIndex: null,
  };

  handleIniciarEdicao = (index: number) => {
    this.setState({ editandoIndex: index });
  };

  handleCancelarEdicao = () => {
    this.setState({ editandoIndex: null });
  };

  handleSalvarEdicao = (dados: Partial<Pet>) => {
    const { editandoIndex } = this.state;
    const { pets, onEditarPet } = this.props;

    if (editandoIndex === null) return;

    const pet = pets[editandoIndex];
    if (!pet || pet.clienteId === undefined) return;

    onEditarPet(pet.clienteId, editandoIndex, dados);
    this.setState({ editandoIndex: null });
  };

  render() {
    const { pets, clientes, onAdicionarPet, onExcluirPet } = this.props;
    const { editandoIndex } = this.state;

    return (
      <div className="space-y-6">
        {/* Card de Cadastro */}
        <Card className="border-gray-700 bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-purple-400">
              Cadastrar Novo Pet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PetForm
              clientes={clientes}
              onAdicionar={(pet) => onAdicionarPet(pet.clienteId, pet)}
            />
          </CardContent>
        </Card>

        {/* Lista de Pets */}
        <div className="space-y-4">
          {pets.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              Nenhum pet cadastrado
            </p>
          ) : (
            pets.map((pet, index) => (
              <Card
                key={`${pet.clienteId}-${index}`}
                className="border-gray-700 bg-gray-800 text-white"
              >
                <CardContent className="p-4">
                  {editandoIndex === index ? (
                    <EditarPetForm
                      pet={pet}
                      onSalvar={this.handleSalvarEdicao}
                      onCancelar={this.handleCancelarEdicao}
                    />
                  ) : (
                    <div className="flex justify-between items-center">
                      {/* Informações do Pet */}
                      <div>
                        <h3 className="font-bold text-lg text-purple-400">
                          {pet.nome}
                        </h3>
                        <div className="text-sm text-gray-300">
                          <span>Espécie: {pet.tipo}</span>
                          {' | '}
                          <span>Raça: {pet.raca}</span>
                          {' | '}
                          <span>Gênero: {pet.genero}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Cliente: {pet.clienteName}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Editar pet"
                          onClick={() => this.handleIniciarEdicao(index)}
                        >
                          <Pencil className="h-4 w-4 text-yellow-400" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Excluir pet"
                          onClick={() =>
                            pet.clienteId !== undefined &&
                            onExcluirPet(pet.clienteId, index)
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }
}
