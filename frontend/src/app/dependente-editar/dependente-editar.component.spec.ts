import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenteEditarComponent } from './dependente-editar.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";

describe('DependenteEditarComponent', () => {
  let component: DependenteEditarComponent;
  let fixture: ComponentFixture<DependenteEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenteEditarComponent ],
      imports: [ RouterTestingModule, FormsModule, NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
