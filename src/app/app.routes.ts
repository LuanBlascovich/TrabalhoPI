import { Routes } from '@angular/router';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'listagem', component: ListagemComponent, title: 'Pets' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'editar', component: EditarComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'alterar/:id', component: EditarComponent },
  { path: 'cadastrar', component: CadastrarComponent, title: 'Cadastrar' },
  { path: 'consultar', component: ConsultarComponent, title: 'Consultar' },
  { path: 'consultar/:id', component: ConsultarComponent },
  { path: 'login', component: LoginComponent, title: 'Fazer login' },
  { path: '**', redirectTo: 'login' },
];
