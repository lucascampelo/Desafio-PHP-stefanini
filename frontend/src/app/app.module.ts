import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeBr from '@angular/common/locales/pt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { LoaderComponent } from './loader/loader.component';
import { FuncionarioEditarComponent } from './funcionario-editar/funcionario-editar.component';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoaderComponent,
    HomeComponent,
    FuncionariosComponent,
    FuncionarioEditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
