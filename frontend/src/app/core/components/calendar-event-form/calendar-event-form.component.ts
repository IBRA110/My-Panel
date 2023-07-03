import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { PopupItem } from '../../interfaces/popup.interface';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss'],
})
export class CalendarEventFormComponent implements OnInit {
  public constructor(private popupService: PopupService) {}

  public ngOnInit(): void {
    this.popupService
      .getEvent()
      .pipe(
        map((event) => event.find((x) => x.code === 'calendar-event-form')),
        untilDestroyed(this),
      )
      .subscribe((e) => console.log(e.data));
  }
}
