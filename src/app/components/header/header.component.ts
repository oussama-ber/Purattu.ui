import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  currentRoute: string = "";
  routerEvents: any;
  _authService = inject(AuthService);

  isMenuOpen: boolean = false;
  constructor(private router: Router) {
    this.routerEvents = this.router.events.subscribe(
      (event:any)=>{
        if(event instanceof NavigationEnd){
          this.currentRoute = event.url;
        }
      }
    )

    this.authListenerSubs = this._authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnInit(): void {
  }
  onLogOut(){
    this._authService.logout();
    this.router.navigate(['/'])
  }

  showSidebar() {
    const sidebar = document.querySelector(".sidebar") as HTMLElement;
    if (sidebar) {
      sidebar.style.display = 'flex';
      setTimeout(() => {
          sidebar.style.transform = 'translateX(0)'; 
      }, 10);
    }
  }
  
  closeSidebar() {
    const sidebar = document.querySelector(".sidebar") as HTMLElement;
    if (sidebar) {
      sidebar.style.transform = 'translateX(100%)'; 
      setTimeout(() => {
          sidebar.style.display = 'none';
      }, 300);
    }
  }
  
  
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.routerEvents.unsubscribe();
  }
}
