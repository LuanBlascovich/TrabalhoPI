import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'http://localhost:3000/credenciais';
  private readonly TOKEN_KEY = 'logado';

  constructor(private http: HttpClient) {}

  login(administrador: string, senha: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.API}?administrador=${administrador}&senha=${senha}`)
      .pipe(
        map((res) => {
          const autenticado = res.length > 0;
          if (autenticado) {
            localStorage.setItem(this.TOKEN_KEY, 'true');
          }
          return autenticado;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLogado(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) === 'true';
  }
}
