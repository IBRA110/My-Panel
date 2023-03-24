import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/theme/theme.service';
import { sidebarToRtl } from '../../data/store/crm.actions';
import { selectIsSidebarRtl } from '../../data/store/crm.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public settingsToggled: boolean = false;
  public isSidebarRtl$: Observable<boolean> =
    this.store.select(selectIsSidebarRtl);
  public currentLang: string = 'english';

  public constructor(
    private store: Store,
    public themeService: ThemeService,
    private translate: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.isSidebarRtl$ = this.store.select(selectIsSidebarRtl);
  }

  public changeSidebarDirection(payload: boolean): void {
    this.store.dispatch(sidebarToRtl({ payload }));
  }

  public translateTo(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
