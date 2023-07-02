import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState } from './calendar.state';

const selectCalendarState = createFeatureSelector<CalendarState>('calendar');

export const selectDate = createSelector(
  selectCalendarState,
  (calendarState: CalendarState) => calendarState.selectedDate,
);

export const selectCurrentCalendar = createSelector(
  selectCalendarState,
  (calendarState: CalendarState) => calendarState.currentCalendar,
);
