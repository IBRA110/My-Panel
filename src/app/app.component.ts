import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div app-theme>
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent {}
