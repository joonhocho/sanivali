import { ISanivaliDef } from '_src/types';

export type ExclusiveMaximumParam = number;

export type ExclusiveMaximumRuleItem = [
  'exclusiveMaximum',
  ExclusiveMaximumParam
];

export const exclusiveMaximumDef: ISanivaliDef = {
  validator: (min: ExclusiveMaximumParam) => (v: number) => v < min,
};
