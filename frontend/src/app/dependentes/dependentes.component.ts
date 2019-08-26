import { Component } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ApiClient} from "../api-client";
import {Funcionario, Dependente} from "../funcionarios/funcionarios.component";

@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.scss']
})
export class DependentesComponent {

  public funcionario: Funcionario;

  constructor(
    private apiClient: ApiClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Recarrega a lista de funcionários sempre que a URL abaixo for acionada
    this.route.url.subscribe(() => {
      const funcionario_id = this.route.snapshot.paramMap.get('funcionario_id');
      if (this.router.url !== `/funcionarios/${funcionario_id}/dependentes`) {
        return;
      }

      this.loadFuncionario();
    });
  }

  /**
   * Apaga um Dependente
   *
   * @param dependente
   * @returns {Promise<void>}
   */
  async apagar(dependente: Dependente): Promise<void> {
    if (!confirm(`Tem certeza que deseja apagar o dependente "${dependente.nome_completo}" ?`)) {
      return;
    }

    await this.apiClient.delete({
      url: `/funcionarios/${dependente.funcionario_id}/dependentes/${dependente.id}`
    });
    this.loadFuncionario();
  }

  /**
   * Carrega os dados de um funcionário, incluindo os dependentes
   *
   * @returns {Promise<void>}
   */
  private async loadFuncionario(): Promise<void> {
    const funcionario_id = this.route.snapshot.paramMap.get('funcionario_id');
    this.funcionario = await this.apiClient.get<Funcionario>({
      url: `/funcionarios/${funcionario_id}`
    });
  }
}
