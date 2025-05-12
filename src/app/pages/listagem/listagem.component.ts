import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../core/services/pets.service';
import { Pets } from '../../core/types/types';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterModule],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css',
})
export class ListagemComponent implements OnInit {
  listaPets: Pets[] = [];
  constructor(private service: PetsService, private router: Router) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
    this.service.listar().subscribe((pets) => {
      this.listaPets = pets;
    });
  }

  excluir(id: string): void {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaPets = this.listaPets.filter((pets) => pets.id !== id);
      });
    }
  }
}
