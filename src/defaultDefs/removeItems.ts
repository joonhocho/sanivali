import { ISanivaliDef, NilType } from '_src/types';
import { notNilTests } from '_src/util';

export type RemoveItemsParam = false | NilType;

export type RemoveItemsRuleItem = ['removeItems', RemoveItemsParam];

export const removeItemsDef: ISanivaliDef = {
  sanitizer: (type: RemoveItemsParam = 'nil') => {
    if (type === false) return null;

    const test = notNilTests[type];

    return (v: any[]) => v.filter(test);
  },
};
