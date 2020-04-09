import { ISanivaliDef } from '_src/types';

export type MaximumParam = number;

export type MaximumRuleItem = ['maximum', MaximumParam];

export const maximumDef: ISanivaliDef = {
  validator: (max: MaximumParam) => (v: number) => v <= max,
};
