import { Component } from '@angular/core';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrl: './lista-estudiantes.component.css'
})
export class ListaEstudiantesComponent
{
  estudiantes: any[] = [];
  error: string = '';

  constructor(private estudiantesService: EstudiantesService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.cargarEstudiantes();
  }

  editarEstudiante(id: number): void {
    this.router.navigate(['/editar-estudiante', id]);
  }

  cargarEstudiantes() {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos:', data); // Para depuración
        this.estudiantes = data;
        console.log('Estudiantes asignados:', this.estudiantes); // Verificar asignación
      },
      error: (e) => {
        console.error('Error al cargar estudiantes:', e);
        this.error = 'Hubo un error al cargar los estudiantes.';
      }
    });
  }

  eliminarEstudiante(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudiantesService.eliminarEstudiante(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminado.',
              'success'
            );
            this.cargarEstudiantes(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'No se pudo eliminar el estudiante, debe tener asociadas unas notas',
              'error'
            );
          }
        });
      }
    });
  }

}
