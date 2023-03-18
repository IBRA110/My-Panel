import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from '../../data-access/store/crm.actions';
import { selectIsSidebarToggled } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isSidebarToggled$: Observable<boolean> = this._store.select(
    selectIsSidebarToggled,
  );

  public constructor(private _store: Store) {}

  public toggleButtonActive(): void {
    this._store.dispatch(toggleSidebar());
  }
}
