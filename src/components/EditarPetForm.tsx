import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Pet } from '@/types/modelo';

interface Props {
  pet: Pet;
  onSalvar: (dados: Partial<Pet>) => void;
  onCancelar: () => void;
}

export default class EditarPetForm extends React.Component<Props, Pet> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...props.pet,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<Pet, keyof Pet>);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSalvar(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="p-4 space-y-4">
        <Input
          name="nome"
          value={this.state.nome}
          onChange={this.handleChange}
          placeholder="Nome"
        />
        <Input
          name="tipo"
          value={this.state.tipo}
          onChange={this.handleChange}
          placeholder="Espécie"
        />
        <Input
          name="raca"
          value={this.state.raca}
          onChange={this.handleChange}
          placeholder="Raça"
        />
        <Input
          name="genero"
          value={this.state.genero}
          onChange={this.handleChange}
          placeholder="Gênero"
        />
        <Button type="submit">Salvar</Button>
        <Button type="button" variant="ghost" onClick={this.props.onCancelar}>
          Cancelar
        </Button>
      </form>
    );
  }
}
