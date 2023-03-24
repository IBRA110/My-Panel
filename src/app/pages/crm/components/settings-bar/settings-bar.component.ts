import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { sidebarToRtl } from '../../data/store/crm.actions';
import { selectIsSidebarReverse } from '../../data/store/crm.selectors';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss'],
})
export class SettingsBarComponent {
  public isSettingsToggled: boolean = false;
  public isSidebarReverse$: Observable<boolean> = this.store.select(
    selectIsSidebarReverse,
  );
  public currentLang: string = 'english';

  public constructor(
    private store: Store,
    public themeService: ThemeService,
    private translate: TranslateService,
  ) {}

  public changeSidebarDirection(payload: boolean): void {
    this.store.dispatch(sidebarToRtl({ payload }));
  }

  public translateTo(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
