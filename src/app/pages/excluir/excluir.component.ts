import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PetsService } from '../../core/services/pets.service';

@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css',
})
export class ExcluirComponent {
  idExcluir: string | null = null;
  erroMensagem: string = '';

  constructor(private petsService: PetsService, private router: Router) {}

  excluirPet(): void {
    this.erroMensagem = '';
    if (this.idExcluir != null) {
      const idString = this.idExcluir.toString();

      this.petsService.excluir(idString).subscribe({
        next: () => {
          this.router.navigate(['/listagem']);
        },
        error: () => {
          this.erroMensagem = `Erro ao excluir o pet.`;
        },
      });
    }
  }
}
