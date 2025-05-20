import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isLogado(): boolean {
    return this.auth.isLogado();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
