import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataForNavSideBar } from '../../data/interfaces/data-for-nav-side-bar.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public baseUrl: string = environment.baseUrl;
  @Output() public toggleButton: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public out: EventEmitter<string> = new EventEmitter<string>();
  @Output() public openPopup: EventEmitter<string> = new EventEmitter<string>();
  @Input() public data: DataForNavSideBar;

  public constructor() {}

  public openSettings(): void {
    this.openPopup.emit();
  }

  public toggleButtonActive(): void {
    this.toggleButton.emit();
  }

  public signOut(): void {
    this.out.emit();
  }
}
