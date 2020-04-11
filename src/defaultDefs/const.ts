import { ISanivaliDef } from '_src/types';

export type ConstParam = null | boolean | number | string;

export type ConstRuleItem = ['const', ConstParam];

export const constDef: ISanivaliDef = {
  validator: (value: ConstParam) => (v) => v === value,
  fatal: true,
  runOnNil: true,
};
