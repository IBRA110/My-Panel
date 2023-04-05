import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signOut } from 'src/app/pages/authentication/data/store/authentication.actions';
import { toggleSidebar } from '../../data/store/admin.actions';
import {
  selectIsSideBarToggled,
  selectUserForNavBar,
} from '../../data/store/admin.selectors';
import { UserForNavBar } from '../../data/interfaces/user.interfase';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isSideBarToggled$: Observable<boolean> = this.store.select(
    selectIsSideBarToggled,
  );

  public user$: Observable<UserForNavBar> =
    this.store.select(selectUserForNavBar);

  public constructor(private store: Store) {}

  public toggleButtonActive(): void {
    this.store.dispatch(toggleSidebar());
  }

  public signOut(): void {
    this.store.dispatch(signOut());
  }
}
