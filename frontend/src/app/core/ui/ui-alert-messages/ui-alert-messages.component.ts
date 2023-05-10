import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UiAlertMessagesService } from '../../services/ui-alert-messages.service';
import { Alert } from '../../interfaces/ui-alert-messages.interfaces';
import { alertAnimation } from '../../animations/ui-alert-messages.animation';
import { CommonModule } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-ui-alert-message',
  templateUrl: 'ui-alert-messages.component.html',
  styleUrls: ['./ui-alert-messages.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [alertAnimation],
})
export class UiAlertMessagesComponent implements OnInit {
  @Input() public id = 'default-alert';

  public alerts: Alert[] = [];

  public constructor(
    private router: Router,
    private alertService: UiAlertMessagesService,
    private changeDetectorRef: ChangeDetectorRef,
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

        if (this.alerts.length > 0) {
          setTimeout(
            () => (this.alerts[this.alerts.length - 1].isHide = true),
            150,
          );
        }

        setTimeout(() => {
          this.alerts = this.alerts.filter((x) => x !== alert);
        }, 20000);
        this.changeDetectorRef.detectChanges();
      });

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.alertService.clear(this.id);
        this.alerts = [];
      }
    });
  }

  public removeAlert(event: Event, alert: Alert): void {
    event.stopPropagation();
    setTimeout(() => {
      this.alerts = this.alerts.filter((x) => x !== alert);
      this.changeDetectorRef.detectChanges();
    }, 250);
  }

  public runFunction(alert: Alert): void {
    if (!!alert.function) {
      alert.function();
    }
  }
}
