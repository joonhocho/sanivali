import { ISanivaliDef } from '_src/types';
import { isEmpty } from '_src/util';

export type EmptyToNullParam = boolean | undefined;

export type EmptyToNullRuleItem =
  | 'emptyToNull'
  | ['emptyToNull', EmptyToNullParam?];

export const emptyToNullDef: ISanivaliDef = {
  sanitizer: (enable?: EmptyToNullParam) => {
    if (enable === false) return null;
    return (v: unknown) => (isEmpty(v) ? null : v);
  },
};
