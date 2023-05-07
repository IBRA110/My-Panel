import { Component, Input } from '@angular/core';
import { Recipient } from '../../data/interfaces/users.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss'],
})
export class RecipientComponent {
  @Input() public recipient: Recipient;

  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public baseUrl: string = environment.baseUrl;

  public checkLastActive(lastActive: Date | string): boolean {
    return typeof lastActive === 'string';
  }
}
