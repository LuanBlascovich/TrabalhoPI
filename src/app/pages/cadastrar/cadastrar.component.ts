import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pets } from '../../core/types/types';
import { PetsService } from '../../core/services/pets.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cadastrar',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css',
})
export class CadastrarComponent {
  titulo = 'Cadastro de Pets';

  private idCounter: number = 1;

  pets: Pets = {
    nome: '',
    idade: 0,
    especie: '',
    raca: '',
    sexo: '',
    preco: 0,
  };

  constructor(
    private service: PetsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLogado()) {
      this.router.navigate(['/login']);
    }
  }

  bloquearDecimal(event: KeyboardEvent): void {
    const char = event.key;

    if (char === '.' || char === ',') {
      event.preventDefault();
    }
  }

  formatarPrecoParaExibir(valor: number | undefined): string {
    if (valor === null || valor === undefined) return '';
    return valor.toFixed(2).replace('.', ',');
  }

  atualizarPreco(valorDigitado: string): void {
    const valorConvertido = parseFloat(valorDigitado.replace(',', '.'));
    if (!isNaN(valorConvertido)) {
      this.pets.preco = valorConvertido;
    } else {
      this.pets.preco = 0;
    }
  }

  precoValido(): boolean {
    return (
      this.pets.preco !== null &&
      this.pets.preco !== undefined &&
      this.pets.preco >= 1 &&
      this.pets.preco <= 10000
    );
  }

  temCamposValidos(): boolean {
    return (
      this.pets.nome.trim() !== '' &&
      this.pets.idade !== null &&
      this.pets.idade !== undefined &&
      this.pets.idade >= 0 &&
      this.pets.idade <= 12 &&
      this.pets.especie.trim() !== '' &&
      this.pets.raca.trim() !== '' &&
      this.pets.sexo.trim() !== '' &&
      this.pets.preco !== null &&
      this.pets.preco !== undefined &&
      this.pets.preco >= 1 &&
      this.pets.preco <= 10000
    );
  }

  capitalizarPrimeiraLetra(texto: string): string {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  submeter() {
    this.service.listar().subscribe((petsCadastrados) => {
      const ids = petsCadastrados.map((p) => parseInt(p.id as string));
      const novoId = (Math.max(...ids, 0) + 1).toString();

      this.pets.nome = this.capitalizarPrimeiraLetra(this.pets.nome.trim());
      this.pets.raca = this.capitalizarPrimeiraLetra(this.pets.raca.trim());

      this.pets.id = novoId;

      this.service.incluir(this.pets).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    });
  }
}
