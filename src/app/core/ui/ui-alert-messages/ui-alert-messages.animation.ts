import {
  trigger,
  animate,
  style,
  state,
  transition,
} from '@angular/animations';

export const alertAnimation = trigger('flyInOut', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ transform: 'translateX(100%)' }),
    animate(200),
  ]),
  transition('* => void', [
    animate(200, style({ transform: 'translateX(100%)' })),
  ]),
]);
