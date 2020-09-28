import type { ISanivaliDef } from '_src/types';

export type ValidateParam = (x: unknown) => boolean;

export type ValidateRuleItem = ['validate', ValidateParam];

export const validateDef: ISanivaliDef = {
  validator: (fn: ValidateParam) => fn,
  runOnNil: true,
};
