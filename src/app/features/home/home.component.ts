import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { UrlInputComponent } from '../url-validation/url-input/url-input.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UrlInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
