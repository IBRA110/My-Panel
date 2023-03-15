import { Theme } from '../theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgba(237, 245, 247)',
    '--background-color-darker': 'rgba(174, 181, 197)',
    '--backgorund-transparent-color': 'rgba(233, 238, 240, 0.8)',
    '--border-color': 'rgba(235, 237, 240, 0.1)',
    '--box-shadow-color': 'rgba(0, 0, 0, 0.6)',

    '--base-text-color': 'rgb(255, 255, 255)',
    '--light-text-color': 'rgb(255,255,255)',

    '--input-backgound-color': 'rgba(255,255,255, 0.3)',
    '--input-error-color': 'rgb(255, 247, 0)',

    '--button-background-default-color': 'rgba(38, 112, 212, 255)',
    '--button-active-background-default-color': 'rgba(33, 101, 194)',
    '--button-disabled-background-default-color': 'rgb(156, 156, 156)',
    '--button-text-default-color': 'rgb(255, 255, 255, 0.9)',

    '--button-background-transparent-color': 'transparent',
    '--button-hover-background-transparent-color': 'rgba(255, 255, 255)',
    '--button-disabled-background-transparent-color': 'rgb(156, 156, 156)',
    '--button-text-transparent-color': 'rgb(255, 255, 255, 0.9)',

    '--base-items-color': 'rgba(69,151,132,255)',
    '--base-items-focus-color': 'rgba(3, 108, 135,255)',

    '--success': 'rgb(46, 178, 59)',
    '--error': 'rgb(255, 0, 0)',
    '--warning': 'rgb(252, 152, 3)',
    '--information': 'rgb(12, 136, 249)',
  },
};
