import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAdminPanel } from './data/store/admin.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(initAdminPanel());
  }
}
