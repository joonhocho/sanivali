import { ISanivaliDef } from '_src/types';

export type ToLocaleLowerCaseParam = string | string[] | undefined;

export type ToLocaleLowerCaseRuleItem =
  | 'toLocaleLowerCase'
  | ['toLocaleLowerCase', ToLocaleLowerCaseParam?];

export const toLocaleLowerCaseDef: ISanivaliDef = {
  sanitizer: (locales?: ToLocaleLowerCaseParam) => (x: string) =>
    x.toLocaleLowerCase(locales),
};
