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
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent {
  idExcluir: number | null = null;
mensagemSucesso: string = '';
erroMensagem: string = '';
constructor(
private petsService: PetsService,
private router: Router
) { }
excluirPet(): void {
this.mensagemSucesso = '';
this.erroMensagem = '';
if (this.idExcluir != null) {
this.petsService.excluir(this.idExcluir).subscribe({
next: () => {
this.router.navigate(['/listagem']);
},
error: () => {
this.erroMensagem = `Erro ao excluir o pet.`;
}
});
}
}
}

