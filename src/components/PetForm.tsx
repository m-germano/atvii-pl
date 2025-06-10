import React from 'react';
import type { Pet, Cliente } from '@/types/modelo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  clientes: Cliente[];
  onAdicionar: (pet: Pet) => void;
}

interface State extends Pet {}

export default class PetForm extends React.Component<Props, State> {
  state: State = {
    nome: '',
    tipo: '',
    raca: '',
    genero: '',
    clienteId: 0,
    clienteName: '',
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cliente = this.props.clientes.find(
      (c) => c.id === Number(this.state.clienteId),
    );
    if (cliente) {
      this.props.onAdicionar({
        ...this.state,
        clienteName: cliente.nome,
        clienteId: cliente.id,
      });
      this.setState({
        nome: '',
        tipo: '',
        raca: '',
        genero: '',
        clienteId: 0,
        clienteName: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="space-y-4">
        <div>
          <Label className="my-4">Nome</Label>
          <Input
            value={this.state.nome}
            onChange={(e) => this.setState({ nome: e.target.value })}
            required
          />
        </div>
        <div>
          <Label className="my-4">Tipo</Label>
          <Input
            value={this.state.tipo}
            onChange={(e) => this.setState({ tipo: e.target.value })}
            required
          />
        </div>
        <div>
          <Label className="my-4">Raça</Label>
          <Input
            value={this.state.raca}
            onChange={(e) => this.setState({ raca: e.target.value })}
            required
          />
        </div>
        <div>
          <Label className="my-4">Gênero</Label>
          <Input
            value={this.state.genero}
            onChange={(e) => this.setState({ genero: e.target.value })}
            required
          />
        </div>
        <div>
          <Label className="my-4">Dono (Cliente)</Label>
          <Select
            onValueChange={(value) =>
              this.setState({ clienteId: Number(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {this.props.clientes.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Adicionar Pet</Button>
      </form>
    );
  }
}
