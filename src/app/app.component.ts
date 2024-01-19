import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  _authService = inject(AuthService);
  title = 'Parattu.ui';
  ngOnInit(): void {
    this._authService.autoAuthUser();
  }
}
