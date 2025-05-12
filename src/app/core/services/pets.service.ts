import { Injectable } from '@angular/core';
import { Pets } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private readonly API = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pets[]> {
    return this.http.get<Pets[]>(this.API).pipe(
      catchError((error) => {
        console.error('Erro ao listar pets:', error);
        throw error;
      })
    );
  }

  incluir(pets: Pets): Observable<Pets> {
    return this.http.post<Pets>(this.API, pets).pipe(
      catchError((error) => {
        console.error('Erro ao incluir pet:', error);
        throw error;
      })
    );
  }

  excluir(id: string): Observable<Pets> {
    return this.http.delete<Pets>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir pet:', error);
        throw error;
      })
    );
  }

  editar(pets: Pets): Observable<Pets> {
    const url = `${this.API}/${pets.id}`;
    return this.http.put<Pets>(url, pets).pipe(
      catchError((error) => {
        console.error('Erro ao editar pet:', error);
        throw error;
      })
    );
  }

  buscarPorId(id: string): Observable<Pets | undefined> {
    return this.http.get<Pets>(`${this.API}/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao buscar pet por ID:', error);
        throw error;
      })
    );
  }
}

