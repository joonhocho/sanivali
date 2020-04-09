import { ISanivaliDef } from '_src/types';

export type ExclusiveMinimumParam = number;

export type ExclusiveMinimumRuleItem = [
  'exclusiveMinimum',
  ExclusiveMinimumParam
];

export const exclusiveMinimumDef: ISanivaliDef = {
  validator: (min: ExclusiveMinimumParam) => (v: number) => v > min,
};
