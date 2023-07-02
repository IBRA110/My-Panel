import { createRehydrateReducer } from 'src/app/core/reducers/rehydrate-reducer';
import { CalendarState, initialState } from './calendar.state';
import { Action, on } from '@ngrx/store';
import {
  changeCalendar,
  changeDate,
  changeDateToToday,
  selectDay,
} from './calendar.actions';
import moment from 'moment';

export const calendarFeatureKey = 'calendar';

const calendarReducer = createRehydrateReducer(
  calendarFeatureKey,
  initialState,
  on(changeDate, (state, action) => ({
    ...state,
    selectedDate: moment(state.selectedDate).add(action.dir, action.event),
  })),
  on(changeDateToToday, (state) => ({
    ...state,
    selectedDate: moment(),
  })),
  on(changeCalendar, (state, action) => ({
    ...state,
    currentCalendar: action.calendar,
  })),
  on(selectDay, (state, action) => ({
    ...state,
    selectedDate: action.day,
  })),
);

export function reducer(state: CalendarState | undefined, action: Action) {
  return calendarReducer(state, action);
}
