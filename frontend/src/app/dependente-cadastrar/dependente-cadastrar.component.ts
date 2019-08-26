import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiClient} from "../api-client";
import {Dependente} from "../funcionarios/funcionarios.component";
import {convertDataStructToISO8601} from "../utils";

@Component({
  selector: 'app-dependente-cadastrar',
  templateUrl: './dependente-cadastrar.component.html',
  styleUrls: ['./dependente-cadastrar.component.scss']
})
export class DependenteCadastrarComponent implements AfterViewInit {
  @ViewChild('content', {'static': false}) content: ElementRef;

  model: Dependente;
  title: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private apiClient: ApiClient
  ) {
    this.title = 'Dependente';
    this.model = <Dependente>{};
  }

  /**
   * Abre a modal para a Edição de um Dependente
   *
   * @param content
   */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(() => {}, () => {
      const funcionario_id = this.route.parent.snapshot.paramMap.get('funcionario_id');
      // Cancela a operação
      this.router.navigate(['/funcionarios', funcionario_id, 'dependentes']);
    });
  }

  /**
   * Salva as informações do Formulário de Dependente, e volta para a Lista de Dependentes
   *
   * @returns {Promise<boolean>}
   */
  async salvar(): Promise<void> {
    // Salva as informações

    // Converte a data do Datepicker
    if (this.model.data_nascimento_formated) {
      this.model.data_nascimento = convertDataStructToISO8601(this.model.data_nascimento_formated, true);
    }

    const funcionario_id = this.route.parent.snapshot.paramMap.get('funcionario_id');
    await this.apiClient.post({
      url: `/funcionarios/${funcionario_id}/dependentes`,
      data: this.model
    }).then(() => {
      // @todo colocar um $toast
      this.router.navigate(['/funcionarios', funcionario_id, 'dependentes']);
      this.modalService.dismissAll();
    }, error => {
      // @todo Tratamento de Validações de erro
      console.error(error);
    });
  }

  /**
   * Abre a modal ao carregar o componente e atualiza o Título
   */
  ngAfterViewInit() {
    // Carrega o Título da rota para ser utilizado na View
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });

    this.open(this.content);
  }

}
