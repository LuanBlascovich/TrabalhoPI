import { Injectable } from '@angular/core';
import { Pets } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private readonly API = 'http://localhost:3000/pets';
  constructor(private http: HttpClient) {}
  listar(): Observable<Pets[]> {
    return this.http.get<Pets[]>(this.API);
  }
  incluir(pets: Pets): Observable<Pets> {
    return this.http.post<Pets>(this.API, pets);
  }
  excluir(id: number): Observable<Pets> {
    return this.http.delete<Pets>(this.API + `/${id}`);
  }
  editar(pets: Pets): Observable<Pets> {
    const url = `${this.API}/${pets.id}`;
    return this.http.put<Pets>(url, pets);
  }
  buscarPorId(id: number): Observable<Pets | undefined> {
    return this.http.get<Pets>(this.API + `/${id}`);
    }
    
}
