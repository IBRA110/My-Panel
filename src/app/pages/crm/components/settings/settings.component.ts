import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSidebarRtl } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settingsToggled: boolean = false;
  public isSidebarRtl$: Observable<boolean>;

  public constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.isSidebarRtl$ = this._store.select(selectIsSidebarRtl);
  }
}
