import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  _authService = inject(AuthService);
  constructor(private router: Router) {
    this.authListenerSubs = this._authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnInit(): void {}
  onLogOut(){
    this._authService.logout();
    this.router.navigate(['/'])
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
