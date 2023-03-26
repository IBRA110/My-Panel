import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { refreshToken } from '../authentication/data/store/authentication.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(refreshToken());
  }
}
