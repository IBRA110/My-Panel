import { Component } from '@angular/core';
import { MySettingsTabsEnum } from '../../enums/my-settings-tabs.enum';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.scss'],
})
export class MySettingsComponent {
  public selectedTab: string = MySettingsTabsEnum.PROFILE;
  public tabs: string[] = Object.keys(MySettingsTabsEnum);

  public get getMySettingsEnum(): typeof MySettingsTabsEnum {
    return MySettingsTabsEnum;
  }
}
