import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ApiClient} from "../api-client";
import {Dependente} from "../funcionarios/funcionarios.component";
import {convertISO8601ToDataStruct, convertDataStructToISO8601} from "../utils";

@Component({
  selector: 'app-dependente-editar',
  templateUrl: '../dependente-cadastrar/dependente-cadastrar.component.html',
  styleUrls: ['../dependente-cadastrar/dependente-cadastrar.component.scss']
})
export class DependenteEditarComponent implements AfterViewInit {
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

    const funcionario_id = this.route.parent.snapshot.paramMap.get('funcionario_id'),
          dependente_id = this.route.snapshot.paramMap.get('dependente_id');

    await this.apiClient.put({
      url: `/funcionarios/${funcionario_id}/dependentes/${dependente_id}`,
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
   * Carrega as informações do Dependente para a Modal
   *
   * @returns {Promise<void>}
   */
  async ngAfterViewInit() {
    // Carrega o Título da rota para ser utilizado na View
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });

    const funcionario_id = this.route.parent.snapshot.paramMap.get('funcionario_id'),
          dependente_id = this.route.snapshot.paramMap.get('dependente_id');

    const dependente = await this.apiClient.get<Dependente>({
            url: `/funcionarios/${funcionario_id}/dependentes/${dependente_id}`,
          });

    // Converte a data para o Datepicker
    if (dependente.data_nascimento) {
      dependente.data_nascimento_formated = convertISO8601ToDataStruct(dependente.data_nascimento);
    }

    this.model = dependente;

    this.open(this.content);
  }

}
