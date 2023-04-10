import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUser } from '../../interfaces/update-user.interface';
import {
  User,
  UserImage,
} from 'src/app/pages/admin/data/interfaces/user.interfase';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';
import { Store } from '@ngrx/store';
import { updateUser } from 'src/app/pages/admin/data/store/admin.actions';
import { Observable } from 'rxjs';
import { selectUser } from 'src/app/pages/admin/data/store/admin.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public updateUserForm: FormGroup<UpdateUser>;
  public defaultAvatarUrl: string | ArrayBuffer =
    '/assets/images/nav-bar/man.png/';

  public user$: Observable<User> = this.store.select(selectUser);

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.user$.subscribe((u) => {
      this.updateUserForm = new FormGroup<UpdateUser>({
        avatar: new FormControl<File>(null),
        firstName: new FormControl<string>(u.firstName),
        lastName: new FormControl<string>(u.lastName),
        city: new FormControl<string>(u.city),
        country: new FormControl<string>(u.country),
        dateOfBirth: new FormControl<Date>(u.dateOfBirth),
        interests: new FormControl<string>(u.interests),
        introduction: new FormControl<string>(u.introduction),
      });
    });
  }

  public getUserAvatar(image: UserImage): string | ArrayBuffer {
    return !!image ? image.url : this.defaultAvatarUrl;
  }

  public save(): void {
    const avatar = new FormData();
    if (!!this.updateUserForm.value) {
    }
    avatar.append('file', this.updateUserForm.value.avatar);
    avatar.append('name', this.updateUserForm.value.avatar.name);

    this.store.dispatch(
      updateUser({
        updateUser: {
          file: avatar,
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
      this.updateUserForm.get('avatar').setValue(event.target.files[0]);
    }
  }
}
