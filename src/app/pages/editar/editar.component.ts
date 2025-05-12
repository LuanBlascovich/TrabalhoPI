import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PetsService } from '../../core/services/pets.service';
import { CommonModule } from '@angular/common';
import { Pets } from '../../core/types/types';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent implements OnInit {
  form!: FormGroup;
  idPets!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private petsService: PetsService
  ) {}

  ngOnInit(): void {
    this.idPets = String(this.route.snapshot.paramMap.get('id')!);
    console.log(this.idPets);

    this.form = this.fb.group({
      nome: [''],
      idade: [''],
      especie: [''],
      raca: [''],
      sexo: [''],
      preco: [''],
    });

    this.petsService.buscarPorId(this.idPets.toString()).subscribe((pets) => {
      if (pets) {
        this.form.patchValue({
          nome: pets.nome,
          idade: pets.idade,
          especie: pets.especie,
          raca: pets.raca,
          sexo: pets.sexo,
          preco: pets.preco,
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const petsAtualizado: Pets = {
        id: this.idPets,
        ...this.form.value,
      };

      this.petsService.editar(petsAtualizado).subscribe(() => {
        this.router.navigate(['listagem']);
      });
    }
  }
}
