import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatUsers } from '../../data/interfaces/users.interface';
import { environment } from 'src/environments/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
  @Output() public onInput: EventEmitter<string> = new EventEmitter<string>();

  @Input() public users: ChatUsers[] = [];
  @Output() public recipient: EventEmitter<string> = new EventEmitter<string>();

  public ngOnInit(): void {
    this.search$.valueChanges
      .pipe(untilDestroyed(this), debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.onInput.emit(value);
      });
  }
}
