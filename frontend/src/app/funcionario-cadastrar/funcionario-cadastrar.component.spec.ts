import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCadastrarComponent } from './funcionario-cadastrar.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";

describe('FuncionarioCadastrarComponent', () => {
  let component: FuncionarioCadastrarComponent;
  let fixture: ComponentFixture<FuncionarioCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioCadastrarComponent ],
      imports: [ RouterTestingModule, FormsModule, NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
