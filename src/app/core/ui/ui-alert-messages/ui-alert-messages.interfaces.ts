export class Alert {
  public id?: string;
  public type?: string;
  public message?: string;
  public icon?: string;
  public isHide: boolean = false;

  public constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'information',
  WARNING = 'warning',
}
