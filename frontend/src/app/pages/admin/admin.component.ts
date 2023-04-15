import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAdminPanel } from './data/store/admin.actions';
import { PresenceService } from 'src/app/core/services/presence.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public constructor(
    private store: Store,
    private presenceService: PresenceService,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(initAdminPanel());
    this.presenceService.createHubConnection();
    this.presenceService.onlineUsers$.subscribe((u) => console.log(u));
  }
  public ngOnDestroy(): void {
    this.presenceService.stopHubConnection();
  }
}
