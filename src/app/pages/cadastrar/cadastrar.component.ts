import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pets } from '../../core/types/types';
import { PetsService } from '../../core/services/pets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  titulo = 'Cadastro de Pets';
pets: Pets = {} as Pets;

constructor(
  private service: PetsService,
  private router: Router
  ) { }
  submeter() {
  this.service.incluir(this.pets).subscribe(() => {
  this.router.navigate(['/consultar']);
  });
  }
  
}
