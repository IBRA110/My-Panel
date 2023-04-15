import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../interfaces/ui-alert-messages.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UiAlertMessagesService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  public onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  public callSuccessMessage(message: string) {
    this.alert(
      new Alert({
        type: AlertType.SUCCESS,
        message,
        icon: 'assets/images/alert-message-icons/success.svg',
      }),
    );
  }

  public callErrorMessage(message: string) {
    this.alert(
      new Alert({
        type: AlertType.ERROR,
        message,
        icon: 'assets/images/alert-message-icons/error.svg',
      }),
    );
  }

  public callInfoMessage(message: string) {
    this.alert(
      new Alert({
        type: AlertType.INFO,
        message,
        icon: 'assets/images/alert-message-icons/info.svg',
      }),
    );
  }

  public callWarningMessage(message: string) {
    this.alert(
      new Alert({
        type: AlertType.WARNING,
        message,
        icon: 'assets/images/alert-message-icons/warning.svg',
      }),
    );
  }

  private alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  public clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
