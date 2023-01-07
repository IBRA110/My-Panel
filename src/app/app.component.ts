import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div app-theme>
    <router-outlet></router-outlet>
    <app-ui-alert-message></app-ui-alert-message>
  </div>`,
})
export class AppComponent {}
