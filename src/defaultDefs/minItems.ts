import type { ISanivaliDef } from '_src/types';

export type MinItemsParam = number;

export type MinItemsRuleItem = ['minItems', MinItemsParam];

export const minItemsDef: ISanivaliDef = {
  validator: (min: MinItemsParam) => (v: any[]) => v.length >= min,
};
