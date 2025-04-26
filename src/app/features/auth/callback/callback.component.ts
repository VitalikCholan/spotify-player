import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.auth.handleCallback(code).subscribe({
          next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/login']),
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
