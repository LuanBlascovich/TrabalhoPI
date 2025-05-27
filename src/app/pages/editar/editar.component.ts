import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetsService } from '../../core/services/pets.service';
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

    this.form = this.fb.group({
      nome: ['', Validators.required],
      idade: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      sexo: ['', Validators.required],
      preco: [
        '',
        [Validators.required, Validators.min(0.01), Validators.max(10000)],
      ],
      comentario: [''],
      imagem: [''],
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
          comentario: pets.comentario,
        });
      }
    });
  }

  capitalizarPrimeiraLetra(texto: string): string {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  bloquearDecimal(event: KeyboardEvent): void {
    const char = event.key;
    if (char === '.' || char === ',') {
      event.preventDefault();
    }
  }

  campoInvalido(campo: string): boolean {
    const controle = this.form.get(campo);
    return !!(
      controle &&
      controle.invalid &&
      (controle.dirty || controle.touched)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const petsAtualizado: Pets = {
        id: this.idPets,
        ...formValue,
        nome: this.capitalizarPrimeiraLetra(formValue.nome.trim()),
        raca: this.capitalizarPrimeiraLetra(formValue.raca.trim()),
      };

      this.petsService.editar(petsAtualizado).subscribe(() => {
        this.router.navigate(['listagem']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
