import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEstudiantesComponent } from './components/Estudiantes/lista-estudiantes/lista-estudiantes.component';
import { CrearEstudiantesComponent } from './components/Estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './components/Estudiantes/editar-estudiantes/editar-estudiantes.component';
import { ListaProfesoresComponent } from './components/Profesores/lista-profesores/lista-profesores.component';
import { CrearProfesoresComponent } from './components/Profesores/crear-profesores/crear-profesores.component';
import { EditarProfesoresComponent } from './components/Profesores/editar-profesores/editar-profesores.component';
import { ListaNotasComponent } from './components/Notas/lista-notas/lista-notas.component';
import { CrearNotasComponent } from './components/Notas/crear-notas/crear-notas.component';
import { EditarNotasComponent } from './components/Notas/editar-notas/editar-notas.component';

const routes: Routes = [
  {
    //si el usuario no coloca nada
    path:'',
    redirectTo:'lista-estudiantes',
    pathMatch:'full'
  },
  {
    path:'lista-estudiantes',
    component:ListaEstudiantesComponent
  },
  {
    path:'crear-estudiantes',
    component:CrearEstudiantesComponent
  },
  {
    path: 'editar-estudiante/:id', component: EditarEstudiantesComponent,
  },
  {
    path:'lista-profesores',
    component:ListaProfesoresComponent
  },
  {
    path:'crear-profesores',
    component:CrearProfesoresComponent
  },
  {
    path: 'editar-profesores/:id', component: EditarProfesoresComponent,
  },
  {
    path:'lista-notas',
    component:ListaNotasComponent
  },
  {
    path:'crear-notas',
    component:CrearNotasComponent
  },
  {
    path: 'editar-notas/:id', component: EditarNotasComponent,
  },
  {
    //si el usuario coloca algo en la url que no es un componente
    path:'**',
    redirectTo:'lista-estudiantes',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
