import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/pages/authentication/data/store/authentication.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  private isAuthenticated$ = this.store.select(selectIsAuthenticated);

  public constructor(private router: Router, private store: Store) {}

  public canActivateChild(): Observable<boolean | UrlTree> {
    return this.verify();
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.verify();
  }

  public canLoad(): Observable<boolean | UrlTree> {
    return this.verify();
  }

  private verify(): Observable<boolean | UrlTree> {
    return this.isAuthenticated$.pipe(
      map((isAuth) => {
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['']);
      }),
    );
  }
}
