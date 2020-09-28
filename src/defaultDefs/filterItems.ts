import type { ISanivaliDef } from '_src/types';

export type FilterItemsParam = (x: any, i: number) => boolean;

export type FilterItemsRuleItem = ['filterItems', FilterItemsParam];

export const filterItemsDef: ISanivaliDef = {
  sanitizer: (fn: FilterItemsParam) => (v: any[]) => v.filter(fn),
};
