import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { signOut } from 'src/app/pages/authentication/data/store/authentication.actions';
import { toggleSidebar } from '../../data/store/admin.actions';
import {
  selectIsSideBarToggled,
  selectUserAvatar,
  selectUserForNavBar,
} from '../../data/store/admin.selectors';
import { UserForNavBar, UserImage } from '../../data/interfaces/user.interfase';
import { PopupService } from 'src/app/core/services/popup.service';
import { MySettingsComponent } from 'src/app/core/components/my-settings/my-settings.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  public user$: Observable<UserForNavBar> =
    this.store.select(selectUserForNavBar);

  public userAvatar$: Observable<UserImage> =
    this.store.select(selectUserAvatar);

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

  public toggleButtonActive(): void {
    this.store.dispatch(toggleSidebar());
  }

  public signOut(): void {
    this.store.dispatch(signOut());
  }

  public getUserAvatar(image: UserImage): string {
    return !!image ? image.url : this.defaultAvatarUrl;
  }
}