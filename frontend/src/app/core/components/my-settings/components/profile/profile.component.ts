import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUserForm } from '../../interfaces/update-user.interface';
import {
  User,
  UserImage,
} from 'src/app/pages/admin/data/interfaces/user.interfase';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';
import { Store } from '@ngrx/store';
import {
  updateUser,
  uploadAvatar,
} from 'src/app/pages/admin/data/store/admin.actions';
import { Observable, take } from 'rxjs';
import {
  selectUser,
  selectUserAvatar,
} from 'src/app/pages/admin/data/store/admin.selectors';
import { environment } from 'src/environments/environment';
import { UiAlertMessagesService } from 'src/app/core/services/ui-alert-messages.service';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public updateUserForm: FormGroup<UpdateUserForm>;
  public defaultAvatarUrl: string | ArrayBuffer =
    '/assets/images/nav-bar/man.png/';
  public baseUrl = environment.baseUrl + '/';
  public user$: Observable<User> = this.store.select(selectUser);
  public userAvatar$: Observable<string> = this.store.select(selectUserAvatar);

  public constructor(
    private store: Store,
    private alertMessagesService: UiAlertMessagesService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.user$.pipe(take(1), untilDestroyed(this)).subscribe((u) => {
      this.updateUserForm = new FormGroup<UpdateUserForm>({
        firstName: new FormControl<string>(u?.firstName),
        lastName: new FormControl<string>(u?.lastName),
        city: new FormControl<string>(u?.city),
        country: new FormControl<string>(u?.country),
        dateOfBirth: new FormControl<Date>(u?.dateOfBirth),
        interests: new FormControl<string>(u?.interests),
        introduction: new FormControl<string>(u?.introduction),
      });
    });
  }

  public getUserAvatar(image: UserImage): string | ArrayBuffer {
    return !!image ? image.url : this.defaultAvatarUrl;
  }

  public save(): void {
    if (this.updateUserForm.pristine) {
      this.alertMessagesService.callWarningMessage(
        this.translateService.instant('NOTHING_CHANGED'),
      );
      return;
    }
    this.store.dispatch(
      updateUser({
        updateUser: {
          firstName: this.updateUserForm.value.firstName,
          lastName: this.updateUserForm.value.lastName,
          city: this.updateUserForm.value.city,
          country: this.updateUserForm.value.country,
          dateOfBirth: this.updateUserForm.value.dateOfBirth,
          interests: this.updateUserForm.value.interests,
          introduction: this.updateUserForm.value.introduction,
        },
      }),
    );
  }

  public get buttonStyle(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }

  public uploadImage(event): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.defaultAvatarUrl = event.target.result;
      };

      this.store.dispatch(
        uploadAvatar({
          file: event.target.files[0],
        }),
      );
    }
  }
}
