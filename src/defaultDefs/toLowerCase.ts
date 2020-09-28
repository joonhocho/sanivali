import type { ISanivaliDef } from '_src/types';

export type ToLowerCaseParam = boolean | undefined;

export type ToLowerCaseRuleItem =
  | 'toLowerCase'
  | ['toLowerCase', ToLowerCaseParam?];

export const toLowerCaseDef: ISanivaliDef = {
  sanitizer: (enable?: ToLowerCaseParam) =>
    enable === false ? null : (x: string) => x.toLowerCase(),
};
