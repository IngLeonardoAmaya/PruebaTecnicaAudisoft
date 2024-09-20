import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { ListaEstudiantesComponent } from './components/Estudiantes/lista-estudiantes/lista-estudiantes.component';
import { CrearEstudiantesComponent } from './components/Estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './components/Estudiantes/editar-estudiantes/editar-estudiantes.component';
import { ListaProfesoresComponent } from './components/Profesores/lista-profesores/lista-profesores.component';
import { CrearProfesoresComponent } from './components/Profesores/crear-profesores/crear-profesores.component';
import { EditarProfesoresComponent } from './components/Profesores/editar-profesores/editar-profesores.component';
import { ListaNotasComponent } from './components/Notas/lista-notas/lista-notas.component';
import { CrearNotasComponent } from './components/Notas/crear-notas/crear-notas.component';
import { EditarNotasComponent } from './components/Notas/editar-notas/editar-notas.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaEstudiantesComponent,
    CrearEstudiantesComponent,
    EditarEstudiantesComponent,
    ListaProfesoresComponent,
    CrearProfesoresComponent,
    EditarProfesoresComponent,
    ListaNotasComponent,
    CrearNotasComponent,
    EditarNotasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
