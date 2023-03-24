import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsSidebarReverse,
  selectIsSidebarToggled,
} from '../../data/store/crm.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public isSidebarToggled$: Observable<boolean> = this.store.select(
    selectIsSidebarToggled,
  );
  public isSidebarReverse$: Observable<boolean> = this.store.select(
    selectIsSidebarReverse,
  );

  public constructor(private store: Store) {}
}
