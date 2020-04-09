import { ISanivaliDef } from '_src/types';

export type RemoveNilItemsParam =
  | 'undefined'
  | 'null'
  | null
  | 'nil'
  | undefined;

export type RemoveNilItemsRuleItem =
  | 'removeNilItems'
  | ['removeNilItems', RemoveNilItemsParam?];

export const removeNilItemsDef: ISanivaliDef = {
  sanitizer: (type?: RemoveNilItemsParam) => {
    let fn: (x: unknown) => boolean;
    if (type === 'undefined') {
      fn = (x) => x !== undefined;
    } else if (type === 'null' || type === null) {
      fn = (x) => x !== null;
    } else {
      // nil
      fn = (x) => x != null;
    }

    return (v: any[]) => v.filter(fn);
  },
};
