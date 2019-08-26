import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {LOCALE_ID} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {SidebarComponent} from "./sidebar/sidebar.component";
import {LoaderComponent} from "./loader/loader.component";
import {HomeComponent} from "./home/home.component";
import {FuncionariosComponent} from "./funcionarios/funcionarios.component";
import {FuncionarioEditarComponent} from "./funcionario-editar/funcionario-editar.component";
import {FuncionarioCadastrarComponent} from "./funcionario-cadastrar/funcionario-cadastrar.component";
import {DependentesComponent} from "./dependentes/dependentes.component";
import {DependenteEditarComponent} from "./dependente-editar/dependente-editar.component";
import {DependenteCadastrarComponent} from "./dependente-cadastrar/dependente-cadastrar.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
      ],
      declarations: [
        AppComponent,
        SidebarComponent,
        LoaderComponent,
        HomeComponent,
        FuncionarioCadastrarComponent,
        FuncionarioEditarComponent,
        FuncionariosComponent,
        DependenteCadastrarComponent,
        DependenteEditarComponent,
        DependentesComponent,
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        { provide: APP_BASE_HREF, useValue: '/' },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header.navbar span').textContent).toContain('Desafio PHP');
  });
});
