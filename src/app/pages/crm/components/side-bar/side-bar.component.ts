import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { isSidebarToggledSelector } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  public isSidebarToggled$: Observable<boolean>;

  public constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.isSidebarToggled$ = this._store.select(isSidebarToggledSelector);
  }
}
