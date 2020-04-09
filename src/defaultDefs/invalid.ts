import { ISanivaliDef } from '_src/types';

export type InvalidParam = boolean | undefined;

export type InvalidRuleItem = 'invalid' | ['invalid', InvalidParam?];

export const invalidDef: ISanivaliDef = {
  validator: (param?: InvalidParam) =>
    param === false ? () => true : () => false,
  runOnNil: true,
};
