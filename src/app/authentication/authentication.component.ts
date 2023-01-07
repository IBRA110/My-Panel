import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  public isSignIn: boolean = true;

  public toggleForms(): void {
    this.isSignIn = !this.isSignIn;
  }
}
