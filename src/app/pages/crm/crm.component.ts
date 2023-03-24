import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSidebarReverse } from './data/store/crm.selectors';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
})
export class CrmComponent {
  public isSidebarReverse$: Observable<boolean> = this.store.select(
    selectIsSidebarReverse,
  );
  public constructor(private store: Store) {}
}
