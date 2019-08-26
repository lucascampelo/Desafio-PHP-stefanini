import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteCadastrarComponent } from './dependente-cadastrar.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";

describe('DependenteCadastrarComponent', () => {
  let component: DependenteCadastrarComponent;
  let fixture: ComponentFixture<DependenteCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenteCadastrarComponent ],
      imports: [ RouterTestingModule, FormsModule, NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenteCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
