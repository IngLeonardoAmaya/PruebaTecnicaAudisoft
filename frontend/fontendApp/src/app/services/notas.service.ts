import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService
{
  private apiUrl = 'https://localhost:7120/api/Notas';

  constructor(private http: HttpClient) { }

  // Obtener todas las notas
  getNotas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener una nota por ID
  getNotaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva nota
  crearNota(nota: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, nota, { headers }); // Verifica que el backend está recibiendo este formato
  }

  // Actualizar una nota existente
  actualizarNota(id: number, nota: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, nota, { headers });
  }

  // Eliminar una nota
  eliminarNota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
