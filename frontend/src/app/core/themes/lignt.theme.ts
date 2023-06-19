import { Theme } from '../interfaces/theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgb(237, 245, 252)',
    '--base-backgound-color': 'rgb(255, 255, 255)',
    '--box-shadow-color': 'rgb(199, 207, 214)',

    '--base-text-color': 'rgb(0, 48, 93)',
    '--transparent-text-color': 'rgba(0, 48, 93, 0.5)',
    '--button-text-color': 'rgb(237, 245, 252)',

    '--button-background-default-color': 'rgba(5, 60, 149)',
    '--button-background-active-color': 'rgb(2, 43, 110)',
    '--button-outline-basic-background-color': 'rgb(143, 155, 179)',

    '--input-backgound-color': 'rgb(255,255,255)',
    '--input-text-color': 'rgb(0, 48, 93)',

    '--selected-tab-color': 'rgba(199, 207, 214, 0.5)',

    '--success': 'rgb(46, 178, 59)',
    '--error': 'rgb(255, 0, 0)',
    '--warning': 'rgb(252, 152, 3)',
    '--information': 'rgb(12, 136, 249)',
  },
};
