import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../data-access/store/crm.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public constructor(private _store: Store) {}

  public toggleButtonActive(): void {
    this._store.dispatch(toggleSidebar());
  }
}
