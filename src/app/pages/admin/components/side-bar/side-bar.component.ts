import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSideBarToggled } from '../../data/store/admin.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public isSidebarToggled$: Observable<boolean> = this.store.select(
    selectIsSideBarToggled,
  );

  public constructor(private store: Store) {}
}
