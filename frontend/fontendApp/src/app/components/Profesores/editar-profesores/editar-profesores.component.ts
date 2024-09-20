import { ProfesoresService } from './../../../services/profesores.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-profesores',
  templateUrl: './editar-profesores.component.html',
  styleUrl: './editar-profesores.component.css'
})
export class EditarProfesoresComponent
{
  profesoresForm!: FormGroup;
  profesoresId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ProfesoresService: ProfesoresService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEstudiante();
  }

  inicializarFormulario(): void {
    this.profesoresForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  cargarEstudiante(): void {
    this.profesoresId = +this.route.snapshot.paramMap.get('id')!;
    this.ProfesoresService.getProfesorById(this.profesoresId).subscribe({
      next: (profesor) => {
        console.log('Profesor cargado:', profesor); // Para depuración
        this.profesoresForm.patchValue({
          nombre: profesor.nombre
        });
      },
      error: (error) => {
        this.toastr.error('Error al cargar el profesor', 'Error');
        console.error('Error al cargar el profesor:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.validarFormulario()) {
      const profesorActualizado = {
        id: this.profesoresId,
        nombre: this.profesoresForm.get('nombre')?.value
      };
      this.ProfesoresService.actualizarProfesor(this.profesoresId, profesorActualizado).subscribe({
        next: () => {
          this.toastr.success('Profesor actualizado con éxito', 'Éxito');
          this.router.navigate(['/lista-profesores']);
        },
        error: (error) => {
          this.toastr.error('Error al actualizar el profesor', 'Error');
          console.error('Error al actualizar el profesor:', error);
        }
      });
    }
  }

  validarFormulario(): boolean {
    if (this.profesoresForm.invalid) {
      if (this.profesoresForm.get('nombre')?.errors?.['required']) {
        this.toastr.error('El nombre es requerido', 'Error de validación');
      } else if (this.profesoresForm.get('nombre')?.errors?.['minlength']) {
        this.toastr.error('El nombre debe tener al menos 2 caracteres', 'Error de validación');
      }
      return false;
    }
    return true;
  }

}
