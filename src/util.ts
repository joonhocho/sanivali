import type { Sanivali } from './sanivali';

export const isSanivali = (x: unknown): x is Sanivali =>
  x ? (x as Sanivali).isSanivali === true : false;
