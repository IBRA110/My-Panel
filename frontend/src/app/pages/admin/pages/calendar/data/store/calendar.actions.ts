import { createAction, props } from '@ngrx/store';
import { CalendarActionsEnum } from './caledar.enum';
import { CalendarType } from '../types/calendar.type';

export const changeDate = createAction(
  CalendarActionsEnum.CHANGE_DATE,
  props<{ dir: number; event: any }>(),
);

export const changeDateToToday = createAction(
  CalendarActionsEnum.CHANGE_DATE_TO_TODAY,
);

export const changeCalendar = createAction(
  CalendarActionsEnum.CHANGE_CALENDAR,
  props<{ calendar: CalendarType }>(),
);

export const selectDay = createAction(
  CalendarActionsEnum.SELECT_DAY,
  props<{ day: moment.Moment }>(),
);
