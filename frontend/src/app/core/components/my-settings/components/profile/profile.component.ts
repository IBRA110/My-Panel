import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUser } from '../../interfaces/update-user.interface';
import { UserImage } from 'src/app/pages/admin/data/interfaces/user.interfase';
import { UiButtonStyleEnum } from 'src/app/core/enums/ui-button-style.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public updateUserForm: FormGroup<UpdateUser>;
  public defaultAvatarUrl: string | ArrayBuffer =
    '/assets/images/nav-bar/man.png/';

  public ngOnInit(): void {
    this.updateUserForm = new FormGroup<UpdateUser>({
      avatar: new FormControl<File>(null),
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      city: new FormControl<string>(''),
      country: new FormControl<string>(''),
      dateOfBirth: new FormControl<Date>(null),
      interests: new FormControl<string>(''),
      introduction: new FormControl<string>(''),
    });
  }

  public getUserAvatar(image: UserImage): string | ArrayBuffer {
    return !!image ? image.url : this.defaultAvatarUrl;
  }

  public save(): void {}

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
