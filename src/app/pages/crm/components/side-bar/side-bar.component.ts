import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSidebarToggled } from '../../data-access/store/crm.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public isSidebarToggled$: Observable<boolean> = this._store.select(
    selectIsSidebarToggled,
  );

  public constructor(private _store: Store) {}
}
