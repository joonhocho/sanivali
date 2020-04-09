import { ISanivaliDef } from '_src/types';

export type ToUpperCaseParam = boolean | undefined;

export type ToUpperCaseRuleItem =
  | 'toUpperCase'
  | ['toUpperCase', ToUpperCaseParam?];

export const toUpperCaseDef: ISanivaliDef = {
  sanitizer: (enable?: ToUpperCaseParam) =>
    enable === false ? null : (x: string) => x.toUpperCase(),
};
