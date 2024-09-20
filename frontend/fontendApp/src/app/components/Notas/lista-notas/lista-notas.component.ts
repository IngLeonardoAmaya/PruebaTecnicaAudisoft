import { Component } from '@angular/core';
import { NotasService } from '../../../services/notas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-notas',
  templateUrl: './lista-notas.component.html',
  styleUrl: './lista-notas.component.css'
})
export class ListaNotasComponent {
  notas: any[] = [];

  constructor(private notasService: NotasService, private router:Router) { }

  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas(): void {
    this.notasService.getNotas().subscribe({
      next: (data) => {
        console.log(data);
        this.notas = data;
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar las notas', 'error');
      }
    });
  }

  editarNota(id: number): void {
    this.router.navigate(['/editar-nota', id]);
  }

  eliminarNota(id: number): void {
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
        this.notasService.eliminarNota(id).subscribe({
          next: () => {
            Swal.fire('Eliminada!', 'La nota ha sido eliminada.', 'success');
            this.cargarNotas(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la nota', 'error');
          }
        });
      }
    });
  }
}
