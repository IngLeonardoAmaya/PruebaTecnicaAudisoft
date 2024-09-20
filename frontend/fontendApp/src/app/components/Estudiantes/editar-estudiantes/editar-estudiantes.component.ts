import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from '../../../services/estudiantes.service';

@Component({
  selector: 'app-editar-estudiantes',
  templateUrl: './editar-estudiantes.component.html',
  styleUrl: './editar-estudiantes.component.css'
})
export class EditarEstudiantesComponent
{
  estudianteForm!: FormGroup;
  estudianteId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private estudiantesService: EstudiantesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEstudiante();
  }

  inicializarFormulario(): void {
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  cargarEstudiante(): void {
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    this.estudiantesService.getEstudianteById(this.estudianteId).subscribe({
      next: (estudiante) => {
        console.log('Estudiante cargado:', estudiante); // Para depuración
        this.estudianteForm.patchValue({
          nombre: estudiante.nombre
        });
      },
      error: (error) => {
        this.toastr.error('Error al cargar el estudiante', 'Error');
        console.error('Error al cargar el estudiante:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.validarFormulario()) {
      const estudianteActualizado = {
        id: this.estudianteId,
        nombre: this.estudianteForm.get('nombre')?.value
      };
      this.estudiantesService.editarEstudiante(this.estudianteId, estudianteActualizado).subscribe({
        next: () => {
          this.toastr.success('Estudiante actualizado con éxito', 'Éxito');
          this.router.navigate(['/estudiantes']);
        },
        error: (error) => {
          this.toastr.error('Error al actualizar el estudiante', 'Error');
          console.error('Error al actualizar el estudiante:', error);
        }
      });
    }
  }

  validarFormulario(): boolean {
    if (this.estudianteForm.invalid) {
      if (this.estudianteForm.get('nombre')?.errors?.['required']) {
        this.toastr.error('El nombre es requerido', 'Error de validación');
      } else if (this.estudianteForm.get('nombre')?.errors?.['minlength']) {
        this.toastr.error('El nombre debe tener al menos 2 caracteres', 'Error de validación');
      }
      return false;
    }
    return true;
  }
}
