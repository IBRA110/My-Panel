import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

export const backgroundAnimation = [
  trigger('backgroundAnimation', [
    transition('void => *', [
      query('.background', style({ opacity: '0' }), { optional: true }),
      query(
        '.background',
        stagger('500ms', [animate('300ms ease-out', style({ opacity: '1' }))]),
        { optional: true },
      ),
    ]),
    transition('* => void', [
      query('.background', style({ opacity: '1' }), { optional: true }),
      query(
        '.background',
        stagger('-500ms', [animate('300ms ease-out', style({ opacity: '0' }))]),
        { optional: true },
      ),
    ]),
  ]),
];
