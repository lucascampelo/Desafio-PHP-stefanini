import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '../funcionarios/funcionarios.component';
import { ApiClient } from '../api-client';
import { convertISO8601ToDataStruct, convertDataStructToISO8601 } from '../utils';

@Component({
  selector: 'app-funcionario-editar',
  templateUrl: './funcionario-editar.component.html',
  styleUrls: ['./funcionario-editar.component.scss']
})
export class FuncionarioEditarComponent implements OnInit {
  @ViewChild('content', {'static': false}) content: ElementRef;

  model: Funcionario;
  title: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private apiClient: ApiClient
  ) {
    this.title = 'Funcionário';
  }

  /**
   * Abre a modal para a Edição de um Funcionário
   *
   * @param content
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(() => {}, () => {
      // Cancela a operação
      this.router.navigate(['/funcionarios']);
    });
  }

  /**
   * Salva as informações do Formulário de Funcionário, e volta para a Lista de Funcionários
   *
   * @returns {Promise<boolean>}
   */
  async salvar(): Promise<void> {
    // Salva, as informações

    // Converte a data do Datepicker
    this.model.data_nascimento = convertDataStructToISO8601(this.model.data_nascimento_formated, true);

    await this.apiClient.put({
      url: `/funcionarios/${this.model.id}`,
      data: this.model
    }).then(() => {
      // @todo colocar um $toast
      console.log('sucesso');
      this.router.navigate(['/funcionarios']);
      this.modalService.dismissAll();
    }, error => {
      console.error(error);
    });

    return false;
  }

  /**
   * Carrega as informações do Funcionário para a Modal
   *
   * @returns {Promise<void>}
   */
  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('funcionario_id');
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
    const funcionario = await this.apiClient.get<Funcionario>({
      url: `/funcionarios/${id}`,
    });

    // Converte a data para o Datepicker
    funcionario.data_nascimento_formated = convertISO8601ToDataStruct(funcionario.data_nascimento);

    this.model = funcionario;
    this.open(this.content);
  }
}
