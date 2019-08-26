import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FuncionarioEditarComponent } from './funcionario-editar/funcionario-editar.component';
import { FuncionarioCadastrarComponent } from "./funcionario-cadastrar/funcionario-cadastrar.component";
import { DependentesComponent } from "./dependentes/dependentes.component";
import { DependenteEditarComponent } from "./dependente-editar/dependente-editar.component";
import { DependenteCadastrarComponent } from "./dependente-cadastrar/dependente-cadastrar.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'funcionarios', component: FuncionariosComponent, children: [
    { path: 'editar/:funcionario_id', component: FuncionarioEditarComponent, data: {title: 'Editar Funcionário'} },
    { path: 'cadastrar', component: FuncionarioCadastrarComponent, data: {title: 'Cadastrar Funcionário'} }
  ] },
  { path: 'funcionarios/:funcionario_id/dependentes', component: DependentesComponent, children: [
    { path: 'editar/:dependente_id', component: DependenteEditarComponent, data: {title: 'Editar Dependente'} },
    { path: 'cadastrar', component: DependenteCadastrarComponent, data: {title: 'Cadastrar Dependente'} }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
