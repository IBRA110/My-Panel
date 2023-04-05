import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopupCode, PopupItem } from '../interfaces/popup.interface';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private readonly animationDurationOut = 100;
  private animationOutTimeout: any;
  private escapeLocked: boolean;

  private readonly closeEvent = new Subject<PopupItem>();
  private readonly event = new BehaviorSubject<PopupItem[]>([]);
  private isShow: boolean;

  public constructor(private overlay: Overlay) {
    this.checkLayoutForModals();
    fromEvent(document, 'keydown').subscribe((event: any) =>
      this.onKeyDown(event),
    );
  }

  public lockEscape(status: boolean): void {
    this.escapeLocked = status;
  }

  /**
   *The method that opens the popup
   * if a popup of this type is already open, then information about it is updated
   */
  public open(code: PopupCode, component: any, data?: any): void {
    const currentModals = this.event.getValue();
    const existModalIndex = currentModals.findIndex((x) => x.code === code);

    const overlayRef = this.overlay.create({ height: '100%', width: '100%' });
    const portal = new ComponentPortal(component);

    const popupElementRef = overlayRef.attach(portal);

    const newModal: PopupItem = { code, overlayRef, data };
    const componentInstance: any & { modalItem: PopupItem } =
      popupElementRef.instance;
    componentInstance.modalItem = newModal;

    if (existModalIndex >= 0) {
      this.close(code);

      currentModals[existModalIndex] = newModal;
      this.event.next(currentModals);
    } else {
      this.event.next([...this.event.getValue(), newModal]);
    }
  }

  /**
   * Close popup
   */
  public close(code?: PopupCode, data?: any): void {
    const popupWrapper = document.querySelectorAll('.popup-wrapper');
    const popupBackground = document.querySelectorAll('.popup-background');
    popupWrapper.item(popupWrapper.length - 1).classList.add('hide');
    popupBackground.item(popupBackground.length - 1).classList.add('hide');
    setTimeout(() => {
      const modals = this.event.getValue();
      if (!(modals && modals.length)) {
        return;
      }
      if (data) {
        const overlayRef = this.overlay.create({
          height: '100%',
          width: '100%',
        });

        const newModal: PopupItem = { code, overlayRef, data };
        this.closeEvent.next(newModal);
      }
      if (code) {
        const removeModalIndex = modals.findIndex((x) => x.code === code);

        if (removeModalIndex >= 0) {
          modals[removeModalIndex].overlayRef.dispose();
          this.closeEvent.next(modals[removeModalIndex]);

          modals.splice(removeModalIndex, 1);
          this.event.next(modals);
        }
      } else {
        modals.forEach((modal) => {
          modal.overlayRef.dispose();
        });
        this.event.next([]);
      }
    }, 300);
  }

  /**
   * The method returns subscriber to the popup open/close event
   */
  public getEvent(): Observable<PopupItem[]> {
    return this.event.asObservable();
  }

  /**
   * The method returns the popup close event
   */
  public getCloseEvent(): Observable<PopupItem> {
    return this.closeEvent.asObservable();
  }

  public checkLayoutForModals(): void {
    this.getEvent().subscribe(() => {
      this.isShow = !!this.event.value.length;
      clearTimeout(this.animationOutTimeout);

      if (this.isShow) {
        this.unLockHtmlElements();
        this.lockHtmlElements();
        setTimeout(() => document.body.getBoundingClientRect());
      } else {
        this.animationOutTimeout = setTimeout(() => {
          this.unLockHtmlElements();
        }, this.animationDurationOut);
      }
    });
  }

  /**
   * Handle  keystrokes
   */
  private onKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && !this.escapeLocked) {
      const currentModals = this.event.getValue();
      if (!currentModals.length) {
        return;
      }

      const lastModal = currentModals[currentModals.length - 1];

      if (lastModal && lastModal.code) {
        this.close(lastModal.code);
      } else {
        this.close();
      }
    }
  }
  private lockHtmlElements() {
    const elements = this.getHtmlElements();
    const modalOpenClass = 'modal-open';
    for (let i = 0; i < elements.elements.length; i++) {
      elements.elements[i].style.paddingRight = elements.scrollBarWidth;
    }
    document.body.classList.add(modalOpenClass);
  }
  private unLockHtmlElements() {
    const elements = this.getHtmlElements();
    const modalOpenClass = 'modal-open';
    for (let i = 0; i < elements.elements.length; i++) {
      elements.elements[i].style.paddingRight = '0px';
    }
    document.body.classList.remove(modalOpenClass);
  }
  private getHtmlElements() {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth + 'px';
    const elements = document.querySelectorAll<HTMLElement>('.lock-element');
    return {
      scrollBarWidth: scrollBarWidth,
      elements: elements,
    };
  }
}
