import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-select-tabs',
  templateUrl: './ui-select-tabs.component.html',
  styleUrls: ['./ui-select-tabs.component.scss'],
})
export class UiSelectTabsComponent {
  @Input() public selectedTab: string = '';
  @Input() public tabs: string[] = [];
  @Output() public onClick = new EventEmitter<string>();

  public getMarginBySelectedTab(): string {
    let indexOfSelectedTab: number = 0;
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i] === this.selectedTab) {
        indexOfSelectedTab = i;
      }
    }
    return (
      (indexOfSelectedTab * 400 + 2 * indexOfSelectedTab).toString() + 'px'
    );
  }

  public checkClass(cssClass: string, tab: string): string {
    if (this.selectedTab === tab) {
      return 'active';
    }
    return cssClass;
  }
}
