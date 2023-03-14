import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from '../../data-access/store/crm.actions';
import { selectIsSidebarToggled } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isSidebarToggled$: Observable<boolean>;

  public constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.isSidebarToggled$ = this._store.select(selectIsSidebarToggled);
  }

  public toggleButtonActive(): void {
    this._store.dispatch(toggleSidebar());
  }
}
