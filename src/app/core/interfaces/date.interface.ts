import * as moment from 'moment/moment';

export interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
  tasks?: Tasks[];
}

export interface Week {
  days: Day[];
}

export interface Tasks {
  startDate: StartDate;
  endDate: StartDate;
  event: string;
}

export interface StartDate {
  day: number;
  month: number;
  year: number;
}
