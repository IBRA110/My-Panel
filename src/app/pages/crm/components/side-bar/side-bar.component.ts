import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isSidebarToggledSelector } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  public menuItemActive: string = 'home';
  public isSidebarToggled$: Observable<boolean>;

  public constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.isSidebarToggled$ = this._store.select(isSidebarToggledSelector);
  }

  public toggleMenuItemActive(item: string): void {
    this.menuItemActive = item;
  }
}
