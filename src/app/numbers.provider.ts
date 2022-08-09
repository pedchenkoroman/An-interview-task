import { InjectionToken, Provider } from '@angular/core';

export const NUMBERS_TOKEN = new InjectionToken(
  'The token of array of numbers'
);

export const NUMBERS_PROVIDER: Provider[] = [
  {
    provide: NUMBERS_TOKEN,
    useValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];
