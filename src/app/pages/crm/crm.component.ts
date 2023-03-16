import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSidebarRtl } from './data-access/store/crm.selectors';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
})
export class CrmComponent implements OnInit {
  public isSidebarRtl$: Observable<boolean>;

  public constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.isSidebarRtl$ = this._store.select(selectIsSidebarRtl);
  }
}
