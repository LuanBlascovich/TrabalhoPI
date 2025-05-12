import { Component } from '@angular/core';
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

  constructor(private service: PetsService, private router: Router) {}

  submeter() {
    this.service.listar().subscribe((petsCadastrados) => {
      const ids = petsCadastrados.map((p) => parseInt(p.id as string));
      const novoId = (Math.max(...ids, 0) + 1).toString();

      this.pets.id = novoId;

      this.service.incluir(this.pets).subscribe(() => {
        this.router.navigate(['/listagem']);
      });
    });
  }
}
