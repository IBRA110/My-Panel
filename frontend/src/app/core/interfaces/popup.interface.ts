import { OverlayRef } from '@angular/cdk/overlay';

export type PopupCode = 'logout-form' | string;

export interface PopupItem {
  code: PopupCode;
  overlayRef: OverlayRef;

  data:
    | {
        [prop: string]: any;

        /**  can not close a modal ass on Esc */
        lock?: boolean;
      }
    | any;
}
