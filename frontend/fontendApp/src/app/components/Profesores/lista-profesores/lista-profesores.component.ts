import { Component } from '@angular/core';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrl: './lista-profesores.component.css'
})
export class ListaProfesoresComponent {
  profesores: any[] = [];

  constructor(private profesoresService: ProfesoresService, private router:Router) { }

  ngOnInit(): void {
    this.cargarProfesores();
  }

  editarProfesor(id: number): void {
    this.router.navigate(['/editar-profesores', id]);
  }


  cargarProfesores(): void {
    this.profesoresService.getProfesores().subscribe({
      next: (data) => {
        this.profesores = data;
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar los profesores', 'error');
      }
    });
  }

  eliminarProfesor(id: number): void {
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
        this.profesoresService.eliminarProfesor(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El profesor ha sido eliminado.', 'success');
            this.cargarProfesores();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el profesor', 'error');
          }
        });
      }
    });
  }
}
