import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromApp from '../../store/reducers/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.State>) {}

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
