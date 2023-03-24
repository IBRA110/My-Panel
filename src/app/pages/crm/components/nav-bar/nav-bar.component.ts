import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from '../../data/store/crm.actions';
import { selectIsSidebarToggled } from '../../data/store/crm.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isSidebarToggled$: Observable<boolean> = this.store.select(
    selectIsSidebarToggled,
  );

  public constructor(private store: Store) {}

  public toggleButtonActive(): void {
    this.store.dispatch(toggleSidebar());
  }
}
