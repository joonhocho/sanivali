import { ISanivaliDef } from '_src/types';

export type FiniteParam = boolean | undefined;

export type FiniteRuleItem = 'finite' | ['finite', FiniteParam?];

export const finiteDef: ISanivaliDef = {
  validator: (enable?: FiniteParam) => (enable === false ? null : isFinite),
  fatal: true,
};
