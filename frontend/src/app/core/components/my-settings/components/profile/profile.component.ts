import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateUser } from '../../interfaces/update-user.interface';
import { UserImage } from 'src/app/pages/admin/data/interfaces/user.interfase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public updateUserForm: FormGroup<UpdateUser>;
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public save(): void {}

  public ngOnInit(): void {
    this.updateUserForm = new FormGroup<UpdateUser>({
      firstName: new FormControl<string>(''),
      lastName: new FormControl<string>(''),
      city: new FormControl<string>(''),
      country: new FormControl<string>(''),
      dateOfBirth: new FormControl<Date>(null),
      interests: new FormControl<string>(''),
      introduction: new FormControl<string>(''),
    });
  }

  public getUserAvatar(image: UserImage): string {
    return !!image ? image.url : this.defaultAvatarUrl;
  }
}
