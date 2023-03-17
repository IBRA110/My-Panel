import { Theme } from '../theme.interface';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background-color': 'rgb(237, 241, 247)',
    '--background-transparent-color': 'rgba(233, 238, 240, 0.8)',
    '--border-color': 'rgba(235, 237, 240, 0.1)',
    '--box-shadow-color': 'rgba(44, 51, 73, 0.1)',

    '--nav-bar-bg-color': 'rgb(255,255,255)',
    '--side-bar-bg-color': 'rgb(255,255,255)',
    '--settings-bg-color': 'rgb(255,255,255)',

    '--base-text-color': 'rgb(34, 43, 69)',
    '--light-text-color': 'rgb(255,255,255)',

    '--input-backgound-color': 'rgba(255,255,255, 0.3)',
    '--input-error-color': 'rgb(255, 247, 0)',

    '--button-background-default-color': 'rgba(38, 112, 212, 255)',
    '--button-active-background-default-color': 'rgba(33, 101, 194)',
    '--button-disabled-background-default-color': 'rgb(156, 156, 156)',
    '--button-text-default-color': 'rgb(255, 255, 255, 0.9)',
    '--button-outline-basic-background-color': 'rgb(143,155,179)',

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
