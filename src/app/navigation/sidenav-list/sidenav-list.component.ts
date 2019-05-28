import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/reducers/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscritpion: Subscription;
  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(fromApp.getIsAuthenticated));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
