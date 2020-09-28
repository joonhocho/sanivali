import type { ISanivaliDef } from '_src/types';

export type ConstParam = undefined | null | boolean | number | string;

export type ConstRuleItem = ['const', ConstParam];

export const constDef: ISanivaliDef = {
  validator: (value: ConstParam) => (v) => v === value,
  fatal: true,
  runOnNil: true,
};
