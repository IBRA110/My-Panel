import { Component, Input, OnInit } from '@angular/core';
import { ChatUsers } from '../../data/interfaces/users.interface';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { loadUsers } from '../../data/store/chat.actions';
import { FormControl } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-users-list[users]',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public baseUrl: string = environment.baseUrl;
  public search$: FormControl = new FormControl();

  @Input() public users: ChatUsers[] = [];

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    this.search$.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.store.dispatch(loadUsers({ userName: value }));
      });
  }
}
