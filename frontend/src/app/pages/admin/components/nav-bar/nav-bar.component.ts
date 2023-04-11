import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { signOut } from 'src/app/pages/authentication/data/store/authentication.actions';
import { toggleSidebar } from '../../data/store/admin.actions';
import {
  selectIsSideBarToggled,
  selectUserAvatar,
  selectUser,
} from '../../data/store/admin.selectors';
import { User, UserImage } from '../../data/interfaces/user.interfase';
import { PopupService } from 'src/app/core/services/popup.service';
import { MySettingsComponent } from 'src/app/core/components/my-settings/my-settings.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';

  public isSideBarToggled$: Observable<boolean> = this.store.select(
    selectIsSideBarToggled,
  );

  public user$: Observable<User> = this.store.select(selectUser);

  public userAvatar$: Observable<string> = this.store.select(selectUserAvatar);

  public constructor(
    private store: Store,
    private popupService: PopupService,
  ) {}

  public ngOnInit(): void {
    this.user$.pipe(take(1), untilDestroyed(this)).subscribe((u) => {
      if (u.firstName === null) {
        this.popupService.open('my-settings', MySettingsComponent);
      }
    });
  }

  public openSettings(): void {
    this.popupService.open('my-settings', MySettingsComponent);
  }

  public toggleButtonActive(): void {
    this.store.dispatch(toggleSidebar());
  }

  public signOut(): void {
    this.store.dispatch(signOut());
  }

  public getUserAvatar(image: string): string {
    return !!image ? environment.baseUrl + image : this.defaultAvatarUrl;
  }
}
