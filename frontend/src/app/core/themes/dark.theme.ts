import { Theme } from '../interfaces/theme.interface';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background-color': 'rgb(21, 26, 48)',
    '--base-backgound-color': 'rgb(34, 43, 69)',
    '--box-shadow-color': 'rgb(26, 31, 51)',

    '--base-text-color': 'rgb(227, 228, 230)',
    '--button-text-color': 'rgb(237, 245, 252)',

    '--button-background-default-color': 'rgb(51, 102, 255)',
    '--button-outline-basic-background-color': 'rgb(143, 155, 179)',

    '--success': 'rgb(46, 178, 59)',
    '--error': 'rgb(255, 0, 0)',
    '--warning': 'rgb(252, 152, 3)',
    '--information': 'rgb(12, 136, 249)',
  },
};
