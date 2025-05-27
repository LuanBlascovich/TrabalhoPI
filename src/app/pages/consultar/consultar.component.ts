import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../core/services/pets.service';
import { Pets } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ConsultarComponent implements OnInit {
  idBusca: string | null = null;
  petsEncontrado: Pets | null = null;
  erroBusca: string = '';

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idBusca = id;
      this.buscarpets();
    }
  }

  buscarpets(): void {
    this.erroBusca = '';
    this.petsEncontrado = null;

    if (this.idBusca?.trim()) {
      this.petsService.buscarPorId(this.idBusca).subscribe({
        next: (pets) => {
          this.petsEncontrado = pets ?? null;
          if (!pets) this.erroBusca = 'Pet não encontrado.';
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar pet.';
        },
      });
    } else {
      this.erroBusca = 'Por favor, insira um ID válido.';
    }
  }

  editarPet(): void {
    if (this.petsEncontrado?.id) {
      this.router.navigate(['/editar', this.petsEncontrado.id]);
    }
  }

  excluirPet(): void {
    if (
      this.petsEncontrado?.id &&
      confirm('Tem certeza que deseja excluir esse pet?')
    ) {
      this.petsService.excluir(this.petsEncontrado.id).subscribe(
        () => {
          alert('Pet excluído com sucesso!');
          this.router.navigate(['/listagem']);
        },
        () => {
          alert('Erro ao excluir pet.');
        }
      );
    }
  }
}
