import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../data/store/admin.selectors';
import { User } from '../../data/interfaces/user.interfase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public user: Observable<User> = this.store.select(selectUser);
  public today = new Date().toLocaleString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  public constructor(private store: Store) {}

  public getTimeOfTheDay(): string {
    let result: string;
    const now: number = new Date().getHours();

    if (now < 12) {
      result = 'Good Morning!';
    } else if (now < 18) {
      result = 'Good Afternoon!';
    } else {
      result = 'Good Evening!';
    }
    return result;
  }
}
