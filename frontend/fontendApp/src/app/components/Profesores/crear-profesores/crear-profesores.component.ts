import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfesoresService } from '../../../services/profesores.service';

@Component({
  selector: 'app-crear-profesores',
  templateUrl: './crear-profesores.component.html',
  styleUrl: './crear-profesores.component.css'
})
export class CrearProfesoresComponent
{
  profesorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ProfesoresService: ProfesoresService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.profesorForm= this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.validarFormulario())
    {
      this.ProfesoresService.crearProfesor(this.profesorForm.value).subscribe({
        next: (response) =>
        {
          this.toastr.success('Profesor creado con éxito', 'Éxito');
          this.router.navigate(['/lista-profesores']);
        },
        error: (error) =>
        {
          this.toastr.error('Error al crear profesor', 'Error');
          console.error('Error al crear profesor:', error);
        }
      });
    }
  }

  validarFormulario(): boolean
  {
    if (this.profesorForm.invalid)
    {
      if (this.profesorForm.get('nombre')?.errors?.['required'])
      {
        this.toastr.error('El nombre es requerido', 'Error de validación');
      } else if (this.profesorForm.get('nombre')?.errors?.['minlength'])
      {
        this.toastr.error('El nombre debe tener al menos 2 caracteres', 'Error de validación');
      }
      return false;
    }
    return true;
  }

}
