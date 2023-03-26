import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { refreshToken } from '../authentication/data/store/authentication.actions';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
})
export class CrmComponent implements OnInit {
  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(refreshToken());
  }
}
