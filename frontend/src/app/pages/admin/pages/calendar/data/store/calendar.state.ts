import moment from 'moment';
import { CalendarType } from '../types/calendar.type';

export interface CalendarState {
  selectedDate: moment.Moment;
  currentCalendar: CalendarType;
}

export const initialState: CalendarState = {
  selectedDate: moment(),
  currentCalendar: 'Monthly',
};
