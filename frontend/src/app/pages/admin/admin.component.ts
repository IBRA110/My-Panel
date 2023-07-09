import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  destroyAdminPanel,
  initAdminPanel,
  toggleSidebar,
} from './data/store/admin.actions';
import { selectDataForNavSideBar } from './data/store/admin.selectors';
import { Observable } from 'rxjs';
import { DataForNavSideBar } from './data/interfaces/data-for-nav-side-bar.interface';
import { signOut } from '../authentication/data/store/authentication.actions';
import { MySettingsComponent } from 'src/app/core/components/my-settings/my-settings.component';
import { PopupService } from 'src/app/core/services/popup.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { adminRouterAnimation } from 'src/app/core/animations/admin-router.animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [adminRouterAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {
  public dataForNavSideBar$: Observable<DataForNavSideBar> = this.store.select(
    selectDataForNavSideBar,
  );

  public constructor(
    private store: Store,
    private popupService: PopupService,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(initAdminPanel());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(destroyAdminPanel());
  }

  public toggleButtonActive(): void {
    this.store.dispatch(toggleSidebar());
  }

  public signOut(): void {
    this.store.dispatch(signOut());
  }

  public openSettings(): void {
    this.popupService.open('my-settings', MySettingsComponent);
  }

  public getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | '' {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
