import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isSideBarActive: boolean = false;

  public toggleButtonActive(): void {
    this.isSideBarActive = !this.isSideBarActive;
  }
}
