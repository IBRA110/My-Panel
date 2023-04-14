import {
  trigger,
  animate,
  style,
  query,
  transition,
  group,
} from '@angular/animations';

export const rootRouterAnimation = trigger('routerAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      style({
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      }),
      { optional: true },
    ),
    group([
      query(
        ':enter',
        [
          style({ opacity: '0' }),
          animate('0.5s 0.5s ease-in-out', style({ opacity: '1' })),
        ],
        { optional: true },
      ),
      query(
        ':leave',
        [
          style({ opacity: '1' }),
          animate('0.5s ease-in-out', style({ opacity: '0' })),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);
