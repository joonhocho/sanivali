import { ISanivaliDef, NilType } from '_src/types';
import { notNilTests } from '_src/util';

export type RemoveNilItemsParam = boolean | NilType | undefined;

export type RemoveNilItemsRuleItem =
  | 'removeNilItems'
  | ['removeNilItems', RemoveNilItemsParam?];

export const removeNilItemsDef: ISanivaliDef = {
  sanitizer: (type: RemoveNilItemsParam = 'nil') => {
    if (type === false) return null;

    // tslint:disable-next-line: no-parameter-reassignment
    if (type === true) type = 'nil';

    const test = notNilTests[type];

    return (v: any[]) => v.filter(test);
  },
};
