import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ApiClient } from "../api-client";

export interface Dependente {
  "id": number,
  "funcionario_id": number,
  "nome_completo": string,
  "sexo": string,
  "cpf": string,
  "data_nascimento": string,
  data_nascimento_formated: NgbDateStruct;
  "anotacoes": string,
  "created_at": string,
  "updated_at": string
}

export interface Funcionario {
  id: number;
  nome_completo: string;
  sexo: string;
  email: string;
  cpf: string;
  data_nascimento: string;
  data_nascimento_formated: NgbDateStruct;
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
export class FuncionariosComponent {

  public funcionarios: Funcionario[];

  constructor(
    private apiClient: ApiClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.funcionarios = [];

    // Recarrega a lista de funcionários sempre que a URL abaixo for acionada
    this.route.url.subscribe(() => {
      if (this.router.url !== '/funcionarios') {
        return;
      }

      this.loadFuncionarios();
    });
  }

  async apagar(funcionario: Funcionario) {
    if (!confirm(`Tem certeza que deseja apagar o funcionário "${funcionario.nome_completo}" ?`)) {
      return;
    }

    await this.apiClient.delete({
      url: `/funcionarios/${funcionario.id}`
    });
    this.loadFuncionarios();
  }

  /**
   * Carrega a lista de funcionários
   *
   * @returns {Promise<void>}
   */
  public async loadFuncionarios() : Promise<void> {
    try {
      let response = await this.apiClient.get<Funcionario[]>({
        url: '/funcionarios'
      });
      this.funcionarios = response.reverse();
    } catch (error) {
      console.error(error);
    }
  }
}
