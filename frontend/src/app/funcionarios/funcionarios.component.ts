import { Component, OnInit } from '@angular/core';
import { ApiClient } from "../api-client";

interface Dependente {
  "id": number,
  "funcionario_id": number,
  "nome_completo": string,
  "sexo": string,
  "cpf": string,
  "data_nascimento": string,
  "anotacoes": string,
  "created_at": string,
  "updated_at": string
}

interface Funcionario {
  id: number;
  nome_completo: string;
  sexo: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  linkedin: string;
  anotacoes: string;
  dependentes: Dependente[];
  created_at: string;
  updated_at: string;
}


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  public funcionarios: Funcionario[];

  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.funcionarios = [];

    this.loadFuncionarios();
  }

  public async loadFuncionarios() : Promise<void> {
    try {
      this.funcionarios = await this.apiClient.get<Funcionario[]>({
        url: '/funcionarios'
      });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
  }

}
