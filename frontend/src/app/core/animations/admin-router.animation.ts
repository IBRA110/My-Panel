import {
  trigger,
  animate,
  style,
  query,
  transition,
  group,
} from '@angular/animations';

export const adminRouterAnimation = trigger('adminRouterAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', style({ opacity: '0' }), { optional: true }),
    group([
      query(
        ':enter',
        [
          style({ opacity: '0' }),
          animate('0.5s 0.3s ease-in-out', style({ opacity: '1' })),
        ],
        { optional: true },
      ),
      query(
        ':leave',
        [
          style({ opacity: '1' }),
          animate(
            '0.3s ease-in-out',
            style({
              opacity: '0',
              position: 'absolute',
              width: 'calc(100% - 160px)',
            }),
          ),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);
