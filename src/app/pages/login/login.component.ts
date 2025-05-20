import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  administrador: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLogado()) {
      this.router.navigate(['/listagem']);
    }
  }

  entrar(): void {
    this.erro = '';

    if (this.administrador.trim() === '' || this.senha.trim() === '') {
      this.erro = 'Por favor, preencha todos os campos!';
      return;
    }

    this.auth.login(this.administrador, this.senha).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/listagem']);
        } else {
          this.erro = 'Usuário ou senha inválidos';
        }
      },
      error: (err) => {
        console.error('Erro ao tentar logar', err);
        this.erro =
          'Erro ao tentar autenticar, por favor tente novamente mais tarde.';
      },
    });
  }
}
