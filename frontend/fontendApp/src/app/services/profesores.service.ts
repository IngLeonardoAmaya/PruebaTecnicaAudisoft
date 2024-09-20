import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService
{

  private apiUrl = 'https://localhost:7120/api/Profesor';

  constructor(private http: HttpClient) { }

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProfesorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearProfesor(profesor: { nombre: string }): Observable<any> {
    return this.http.post(this.apiUrl, profesor);
  }

  actualizarProfesor(id: number, profesor: { nombre: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, profesor);
  }

  eliminarProfesor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
