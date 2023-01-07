import { range } from 'rxjs';
import { Theme } from '../theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgb(235, 237, 240)',
    '--backgorund-transparent-color': 'rgba(235, 237, 240, 0.13)',
    '--border-color': 'rgba(235, 237, 240, 0.1)',
    '--box-shadow-color': 'rgba(0, 0, 0, 0.6)',
    '--base-text-color': 'rgb(87, 87, 87)',
    '--input-backgound-color': 'rgb(227, 228, 230)',
  },
};
