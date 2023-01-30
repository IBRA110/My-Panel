import { Theme } from '../theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgba(228, 225, 206, 255)',
    '--backgorund-transparent-color': 'rgba(241, 228, 212, 0.3)',
    '--border-color': 'rgba(235, 237, 240, 0.1)',
    '--box-shadow-color': 'rgba(0, 0, 0, 0.6)',
    '--base-text-color': 'rgb(87, 87, 87)',

    '--input-backgound-color': 'rgba(255,255,255,255)',

    '--button-background-default-color': 'rgba(69,151,132,255)',
    '--button-active-background-default-color': 'rgba(60, 130, 114)',
    '--button-disabled-background-default-color': 'rgb(156, 156, 156)',
    '--button-text-default-color': 'rgb(255, 255, 255, 0.9)',

    '--button-background-dark-color': 'rgba(95,96,92,255)',
    '--button-active-background-dark-color': 'rgba(78, 79, 76)',
    '--button-disabled-background-dark-color': 'rgb(156, 156, 156)',
    '--button-text-dark-color': 'rgb(255, 255, 255, 0.9)',

    '--base-items-color': 'rgba(69,151,132,255)',
    '--base-items-focus-color': 'rgba(69,151,132,255)',
  },
};
