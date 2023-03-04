import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  Alert,
  AlertType,
} from '../ui/ui-alert-messages/ui-alert-messages.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UiAlertMessagesService {
  private _subject = new Subject<Alert>();
  private _defaultId = 'default-alert';

  public onAlert(id = this._defaultId): Observable<Alert> {
    return this._subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  public callSuccessMessage(message: string) {
    this._alert(
      new Alert({
        type: AlertType.SUCCESS,
        message,
        icon: 'assets/images/alert-message-icons/success.svg',
      }),
    );
  }

  public callErrorMessage(message: string) {
    this._alert(
      new Alert({
        type: AlertType.ERROR,
        message,
        icon: 'assets/images/alert-message-icons/error.svg',
      }),
    );
  }

  public callInfoMessage(message: string) {
    this._alert(
      new Alert({
        type: AlertType.INFO,
        message,
        icon: 'assets/images/alert-message-icons/info.svg',
      }),
    );
  }

  public callWarningMessage(message: string) {
    this._alert(
      new Alert({
        type: AlertType.WARNING,
        message,
        icon: 'assets/images/alert-message-icons/warning.svg',
      }),
    );
  }

  private _alert(alert: Alert) {
    alert.id = alert.id || this._defaultId;
    this._subject.next(alert);
  }

  public clear(id = this._defaultId) {
    this._subject.next(new Alert({ id }));
  }
}
