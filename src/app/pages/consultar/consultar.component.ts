import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../core/services/pets.service';
import { Pets } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ConsultarComponent {
  idBusca: string | null = null;
  petsEncontrado: Pets | null = null;
  erroBusca: string = '';

  constructor(private petsService: PetsService) {}

  buscarpets(): void {
    this.erroBusca = '';
    this.petsEncontrado = null;

    if (this.idBusca != null) {
      if (this.idBusca.trim() !== '') {
        this.petsService.buscarPorId(this.idBusca).subscribe({
          next: (pets) => {
            if (pets) {
              this.petsEncontrado = pets;
            } else {
              this.erroBusca = 'Pet não encontrado.';
            }
          },
          error: () => {
            this.erroBusca = 'Erro ao buscar pet.';
          },
        });
      } else {
        this.erroBusca = 'Por favor, insira um ID válido.';
      }
    }
  }
}
