import { ISanivaliDef } from '_src/types';

export type InstanceParam = { new (): any };

export type InstanceRuleItem = ['instance', InstanceParam];

export const instanceDef: ISanivaliDef = {
  validator: (Class: InstanceParam) => (v) => v instanceof Class,
  fatal: true,
  runOnNil: true,
};
