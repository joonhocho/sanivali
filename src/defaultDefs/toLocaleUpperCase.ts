import { ISanivaliDef } from '_src/types';

export type ToLocaleUpperCaseParam = string | string[] | undefined;

export type ToLocaleUpperCaseRuleItem =
  | 'toLocaleUpperCase'
  | ['toLocaleUpperCase', ToLocaleUpperCaseParam?];

export const toLocaleUpperCaseDef: ISanivaliDef = {
  sanitizer: (locales?: ToLocaleUpperCaseParam) => (x: string) =>
    x.toLocaleUpperCase(locales),
};
