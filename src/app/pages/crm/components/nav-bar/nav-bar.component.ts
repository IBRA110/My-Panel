import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../data-access/store/crm.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isSideBarActive: boolean = false;

  public constructor(private _store: Store) {}

  public toggleButtonActive(): void {
    this.isSideBarActive = !this.isSideBarActive;
    this._store.dispatch(toggleSidebar({ payload: this.isSideBarActive }));
  }
}
