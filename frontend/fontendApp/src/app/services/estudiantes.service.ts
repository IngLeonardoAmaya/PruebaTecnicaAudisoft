import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService
{
  private apiUrl = 'https://localhost:7120/api/Estudiante';

  constructor(private http: HttpClient) { }

  // Obtener lista de estudiantes
  getEstudiantes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener estudiante por ID
  getEstudianteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ObtenerPorId/${id}`).pipe(
      tap(data => console.log('Datos recibidos del servidor:', data)),
      catchError(this.handleError)
    );
  }

  // Crear un nuevo estudiante
  crearEstudiante(estudiante: { nombre: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, estudiante, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Editar un estudiante existente
  editarEstudiante(id: number, estudiante: { nombre: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estudiante, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Eliminar un estudiante
  eliminarEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error completo:', error);
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // El backend retornó un código de error
      errorMessage = `Error del servidor: Código ${error.status}, ` +
                     `mensaje: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    // Agregar más detalles sobre la solicitud
    console.error('URL de la solicitud:', error.url);
    console.error('Método de la solicitud:', error.url ? 'GET' : 'Desconocido');
    return throwError(() => new Error(errorMessage));
  }
}
