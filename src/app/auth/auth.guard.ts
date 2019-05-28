import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromApp from '../store/reducers/app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromApp.State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(fromApp.getIsAuthenticated), take(1));
  }

  canLoad(route: Route) {
    return this.store.pipe(select(fromApp.getIsAuthenticated), take(1));
  }
}
