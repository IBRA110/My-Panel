import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const transitionAnimation = [
  trigger('transitionAnimation', [
    transition('void => *', [
      query('.popup-anim', style({ transform: 'scale(1.2)', opacity: 0 }), {
        optional: true,
      }),
      query(
        '.popup-anim',
        stagger('500ms', [
          animate(
            '100ms 300ms ease-out',
            style({ transform: 'scale(1)', opacity: 1 }),
          ),
        ]),
        { optional: true },
      ),
    ]),
    transition('* => void', [
      query('.popup-anim', style({ transform: 'translateY(0%)' }), {
        optional: true,
      }),
      query(
        '.popup-anim',
        stagger('-500ms', [
          animate(
            '300ms .1s ease-out',
            style({ transform: 'translateY(-100%)' }),
          ),
        ]),
        { optional: true },
      ),
    ]),
  ]),
];
