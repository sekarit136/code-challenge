import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
   imports: [MatToolbarModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 public email: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
  this.email = this.auth.getUserEmail();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
