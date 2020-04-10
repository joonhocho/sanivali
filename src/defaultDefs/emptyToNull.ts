import { ISanivaliDef } from '_src/types';
import { isEmpty } from '_src/util';

export type EmptyToNullParam = boolean | 'undefined' | undefined;

export type EmptyToNullRuleItem =
  | 'emptyToNull'
  | ['emptyToNull', EmptyToNullParam?];

export const emptyToNullDef: ISanivaliDef = {
  sanitizer: (enable?: EmptyToNullParam) => {
    if (enable === false) return null;
    const nil = enable === 'undefined' ? undefined : null;
    return (v: unknown) => (isEmpty(v) ? nil : v);
  },
  runOnNil: true,
};
