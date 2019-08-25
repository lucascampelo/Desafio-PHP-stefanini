import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FuncionarioEditarComponent } from './funcionario-editar/funcionario-editar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'funcionarios', component: FuncionariosComponent, children: [
    { path: 'editar/:funcionario_id', component: FuncionarioEditarComponent, data: {title: 'Editar Funcionário'} }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
