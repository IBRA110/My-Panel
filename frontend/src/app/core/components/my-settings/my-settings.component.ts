import { Component } from '@angular/core';
import { MySettingsTabsEnum } from '../../enums/my-settings-tabs.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent {
  public selectedTab: string = this.translateService.instant(
    MySettingsTabsEnum.PROFILE,
  );
  public tabs: string[] = Object.values(MySettingsTabsEnum).map((k) =>
    this.translateService.instant(k),
  );

  public constructor(public translateService: TranslateService) {}

  public get getMySettingsEnum(): typeof MySettingsTabsEnum {
    return MySettingsTabsEnum;
  }
}
