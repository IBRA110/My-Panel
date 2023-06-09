import { trigger, animate, style, transition } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0, position: 'absolute', transform: 'translateY(-50%)' }),
    animate('400ms 300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1, position: 'absolute', transform: 'translateY(-50%)' }),
    animate('300ms  ease-in', style({ opacity: 0 })),
  ]),
]);

export const fadeAnimationMySettings = trigger('fadeAnimationMySettings', [
  transition(':enter', [
    style({ opacity: 0, position: 'absolute', width: '100%' }),
    animate('400ms 300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1, position: 'absolute', width: '100%' }),
    animate('300ms  ease-in', style({ opacity: 0 })),
  ]),
]);
