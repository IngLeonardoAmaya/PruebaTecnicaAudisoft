import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-estudiantes',
  templateUrl: './crear-estudiantes.component.html',
  styleUrl: './crear-estudiantes.component.css'
})
export class CrearEstudiantesComponent
{
  estudianteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.validarFormulario())
    {
      this.estudiantesService.crearEstudiante(this.estudianteForm.value).subscribe({
        next: (response) =>
        {
          this.toastr.success('Estudiante creado con éxito', 'Éxito');
          this.router.navigate(['/estudiantes']);
        },
        error: (error) =>
        {
          this.toastr.error('Error al crear estudiante', 'Error');
          console.error('Error al crear estudiante:', error);
        }
      });
    }
  }

  validarFormulario(): boolean
  {
    if (this.estudianteForm.invalid)
    {
      if (this.estudianteForm.get('nombre')?.errors?.['required'])
      {
        this.toastr.error('El nombre es requerido', 'Error de validación');
      } else if (this.estudianteForm.get('nombre')?.errors?.['minlength'])
      {
        this.toastr.error('El nombre debe tener al menos 2 caracteres', 'Error de validación');
      }
      return false;
    }
    return true;
  }
}
