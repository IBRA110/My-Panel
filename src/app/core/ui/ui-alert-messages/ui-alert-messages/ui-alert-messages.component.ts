import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UiAlertMessagesService } from '../../../services/ui-alert-messages.service';
import { Alert } from '../ui-alert-messages.interfaces';
import { alertAnimation } from '../ui-alert-messages.animation';

@UntilDestroy()
@Component({
  selector: 'app-ui-alert-message',
  templateUrl: 'ui-alert-messages.component.html',
  styleUrls: ['./ui-alert-messages.component.scss'],
  animations: [alertAnimation],
})
export class UiAlertMessagesComponent implements OnInit {
  @Input() public id = 'default-alert';

  public alerts: Alert[] = [];

  public constructor(
    private router: Router,
    private alertService: UiAlertMessagesService,
  ) {}

  public ngOnInit() {
    this.alertService
      .onAlert(this.id)
      .pipe(untilDestroyed(this))
      .subscribe((alert: Alert) => {
        if (!alert.message) {
          return;
        }
        this.alerts.push(alert);

        if (this.alerts.length) {
          setTimeout(
            () => (this.alerts[this.alerts.length - 1].isHide = true),
            150,
          );
        }

        setTimeout(() => {
          this.alerts.pop();
        }, 20000);
      });

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.alertService.clear(this.id);
        this.alerts = [];
      }
    });
  }

  public removeAlert(alert: Alert) {
    setTimeout(() => {
      this.alerts = this.alerts.filter((x) => x !== alert);
    }, 250);
  }
}
