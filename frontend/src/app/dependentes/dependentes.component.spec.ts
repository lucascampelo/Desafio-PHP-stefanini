import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentesComponent } from './dependentes.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {LoaderComponent} from "../loader/loader.component";

describe('DependentesComponent', () => {
  let component: DependentesComponent;
  let fixture: ComponentFixture<DependentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentesComponent, LoaderComponent ],
      imports: [ RouterTestingModule, FormsModule, NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
