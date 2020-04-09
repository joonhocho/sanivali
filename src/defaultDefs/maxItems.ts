import { ISanivaliDef } from '_src/types';

export type MaxItemsParam = number;

export type MaxItemsRuleItem = ['maxItems', MaxItemsParam];

export const maxItemsDef: ISanivaliDef = {
  validator: (max: MaxItemsParam) => (v: any[]) => v.length <= max,
};
