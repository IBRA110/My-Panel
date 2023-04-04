import { Theme } from '../theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgb(237, 245, 252)',
    '--box-shadow-color': 'rgb(199, 207, 214)',

    '--nav-bar-background-color': 'rgb(255, 255, 255)',
    '--side-bar-background-color': 'rgb(255, 255, 255)',

    '--base-text-color': 'rgb(74, 73, 73)',
    '--button-text-color': 'rgb(237, 245, 252)',

    '--button-background-default-color': 'rgb(51, 102, 255)',
    '--button-background-active-color': 'rgb(35, 62, 196)',
    '--button-outline-basic-background-color': 'rgb(143, 155, 179)',

    '--success': 'rgb(46, 178, 59)',
    '--error': 'rgb(255, 0, 0)',
    '--warning': 'rgb(252, 152, 3)',
    '--information': 'rgb(12, 136, 249)',
  },
};
