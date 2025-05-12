import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

export const routes: Routes = [
  { path: 'listagem', component: ListagemComponent},
  { path: '', component: ConsultarComponent },
  { path: 'editar', component: EditarComponent},
  { path: 'editar/:id', component: EditarComponent },
  { path: 'cadastrar', component: CadastrarComponent, title: 'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent },
  { path: 'alterar/:id', component: EditarComponent },
  { path: 'excluir', component: ExcluirComponent },
  { path: '**', redirectTo: 'consultar' },
];
