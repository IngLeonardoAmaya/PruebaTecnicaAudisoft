import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasService } from '../../../services/notas.service';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.component.html',
  styleUrl: './editar-notas.component.css'
})
export class EditarNotasComponent
{
  notaForm!: FormGroup;
  notaId!: number;
  estudiantes: any[] = [];
  profesores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEstudiantes();
    this.cargarProfesores();
    this.cargarNota();
  }

  inicializarFormulario(): void {
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required],
      idEstudiante: ['', Validators.required],
      idProfesor: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  cargarEstudiantes(): void {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudieron cargar los estudiantes', 'error');
      }
    });
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

  cargarNota(): void {
    this.notaId = +this.route.snapshot.paramMap.get('id')!;
    this.notasService.getNotaById(this.notaId).subscribe({
      next: (nota) => {
        this.notaForm.patchValue({
          nombre: nota.nombre,
          idEstudiante: nota.idEstudiante,
          idProfesor: nota.idProfesor,
          valor: nota.valor
        });
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo cargar la nota', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const notaActualizada = {
        id: this.notaId,
        ...this.notaForm.value
      };
      this.notasService.actualizarNota(this.notaId, notaActualizada).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Nota actualizada correctamente', 'success');
          this.router.navigate(['/lista-notas']);
        },
        error: (error) => {
          Swal.fire('Error', 'No se pudo actualizar la nota', 'error');
        }
      });
    }
  }

}
