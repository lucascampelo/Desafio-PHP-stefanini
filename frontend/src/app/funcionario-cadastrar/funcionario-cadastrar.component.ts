import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Funcionario} from '../funcionarios/funcionarios.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from "@angular/router";
import {convertDataStructToISO8601} from "../utils";
import {ApiClient} from "../api-client";

@Component({
  selector: 'app-funcionario-cadastrar',
  templateUrl: './funcionario-cadastrar.component.html',
  styleUrls: ['./funcionario-cadastrar.component.scss']
})
export class FuncionarioCadastrarComponent implements AfterViewInit {
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
    this.model = <Funcionario>{};
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
    if (this.model.data_nascimento_formated) {
      this.model.data_nascimento = convertDataStructToISO8601(this.model.data_nascimento_formated, true);
    }

    await this.apiClient.post({
      url: '/funcionarios',
      data: this.model
    }).then(() => {
      // @todo colocar um $toast
      this.router.navigate(['/funcionarios']);
      this.modalService.dismissAll();
    }, error => {
      // @todo Tratamento de Validações de erro
      console.error(error);
    });

    return false;
  }

  /**
   * Abre a modal para cadastrar o funcionário
   *
   * @returns {Promise<void>}
   */
  ngAfterViewInit() {
    // Carrega o Título da rota para ser utilizado na View
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });

    this.open(this.content);
  }

}
