import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EventForm } from './interfaces/event-form.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { UiButtonStyleEnum } from '../../enums/ui-button-style.enum';

@UntilDestroy()
@Component({
  selector: 'app-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.scss'],
})
export class CalendarEventFormComponent implements OnInit {
  public eventForm: FormGroup<EventForm>;

  public constructor(private popupService: PopupService) {}

  public ngOnInit(): void {
    this.popupService
      .getEvent()
      .pipe(
        map((event) => event.find((x) => x.code === 'calendar-event-form')),
        untilDestroyed(this),
      )
      .subscribe((e) => {
        const d: moment.Moment = e.data;
        this.eventForm = new FormGroup<EventForm>({
          title: new FormControl<string>(''),
          content: new FormControl<string>(''),
          startDate: new FormControl<Date>(new Date(d.date())),
          endDate: new FormControl<Date>(null),
          color: new FormControl<string>('rgb(23, 112, 213)'),
          isPrivate: new FormControl<boolean>(true),
        });
      });
  }

  public get buttonStyle(): typeof UiButtonStyleEnum {
    return UiButtonStyleEnum;
  }

  public save(): void {}
}
