import { Theme } from '../theme.interface';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background-color': 'rgb(21, 26, 48)',
    '--box-shadow-color': 'rgb(26, 31, 51)',

    '--nav-bar-bg-color': 'rgb(34, 43, 69)',
    '--side-bar-bg-color': 'rgb(34, 43, 69)',
    '--settings-bg-color': 'rgb(34, 43, 69)',

    '--base-text-color': 'rgb(255, 255, 255)',

    '--button-background-default-color': 'rgb(51, 102, 255)',
    '--button-outline-basic-background-color': 'rgba(143, 155, 179, 0.16)',
  },
};
