import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotasService } from '../../../services/notas.service';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-notas',
  templateUrl: './crear-notas.component.html',
  styleUrl: './crear-notas.component.css'
})
export class CrearNotasComponent
{
  notaForm: FormGroup;
  estudiantes: any[] = [];
  profesores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notasService: NotasService,
    private estudiantesService: EstudiantesService,
    private profesoresService: ProfesoresService
  ) {
    this.notaForm = this.fb.group({
      nombre: ['', Validators.required],
      idEstudiante: ['', Validators.required],
      idProfesor: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarProfesores();
  }

  cargarEstudiantes(): void {
    this.estudiantesService.getEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes', error);
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
        console.error('Error al cargar profesores', error);
        Swal.fire('Error', 'No se pudieron cargar los profesores', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      // Asigna manualmente los nombres de Estudiante y Profesor si están disponibles
      const nota = {
        ...this.notaForm.value,
        nombreEstudiante: this.estudiantes.find(e => e.id === this.notaForm.value.idEstudiante)?.nombre || '',
        nombreProfesor: this.profesores.find(p => p.id === this.notaForm.value.idProfesor)?.nombre || ''
      };

      this.notasService.crearNota(nota).subscribe({
        next: (response) => {
          Swal.fire('Éxito', 'Nota agregada correctamente', 'success');
          this.router.navigate(['/lista-notas']);
        },
        error: (error) => {
          console.error('Error al agregar nota', error);
          if (error.error && error.error.errors) {
            for (const key in error.error.errors) {
              console.error(`Error en ${key}: ${error.error.errors[key].join(', ')}`);
            }
          }
          Swal.fire('Error', 'No se pudo agregar la nota', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente', 'error');
    }
  }

}
