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
    '--button-background-color':
      ' linear-gradient(rgb(35, 162, 246), rgb(24, 69, 173))',
    '--button-active-background-color':
      ' linear-gradient(rgb(24, 69, 173), rgb(35, 162, 246))',
    '--button-disabled-background-color':
      ' linear-gradient(rgb(156, 156, 156), rgb(212, 212, 212))',
    '--button-text-color': 'rgb(255, 255, 255, 0.9)',
    '--base-items-color': 'rgb(35, 162, 246)',
    '--base-items-focus-color': 'rgb(24, 69, 173)',
  },
};
