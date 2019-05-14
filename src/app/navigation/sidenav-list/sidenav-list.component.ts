import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})

export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscritpion: Subscription;
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscritpion = this.authService.authChange.subscribe(authData => {
      this.isAuth = authData;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscritpion.unsubscribe();
  }
}
