import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsSidebarRtl,
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
  public isSidebarRtl$: Observable<boolean> =
    this.store.select(selectIsSidebarRtl);

  public constructor(private store: Store) {}
}
