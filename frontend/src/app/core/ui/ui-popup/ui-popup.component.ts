import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs';
import { transitionAnimation } from '../../animations/transition.animation';
import { backgroundAnimation } from '../../animations/background.animation';
import { PopupService } from '../../services/popup.service';
import { PopupCode, PopupItem } from '../../interfaces/popup.interface';
import { NavigationEnd, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-ui-popup',
  templateUrl: './ui-popup.component.html',
  styleUrls: ['./ui-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [transitionAnimation, backgroundAnimation],
})
export class UiPopupComponent implements OnInit {
  @Input() public dataLoaded: boolean = true;
  @Input() public popupCode: PopupCode;
  @Input() public useCloseArea = true;
  @Output() public afterInit = new EventEmitter<PopupItem>();

  public constructor(
    private popupService: PopupService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.popupService
      .getEvent()
      .pipe(
        map((popups) => popups.find((x) => x.code === this.popupCode)),
        filter((x) => !!x),
        untilDestroyed(this),
      )
      .subscribe((popup) => this.afterInit.emit(popup));

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.popupService.close(this.popupCode);
      }
    });
  }

  public close(): void {
    this.popupService.close(this.popupCode);
  }
}
