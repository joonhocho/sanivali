import { ISanivaliDef } from '_src/types';

export type ValidParam = boolean | undefined;

export type ValidRuleItem = 'valid' | ['valid', ValidParam?];

export const validDef: ISanivaliDef = {
  validator: (param?: ValidParam) =>
    param === false ? () => false : () => true,
};
