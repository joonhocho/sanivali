import { ISanivaliDef } from '_src/types';
import { isInteger } from '_src/util';

export type IntegerParam = boolean | undefined;

export type IntegerRuleItem = 'integer' | ['integer', IntegerParam?];

export const integerDef: ISanivaliDef = {
  validator: (enable?: IntegerParam) => (enable === false ? null : isInteger),
  fatal: true,
  runOnNil: true,
};
