import { ISanivaliDef } from '_src/types';

export type MaxPropertiesParam = number;

export type MaxPropertiesRuleItem = ['maxProperties', MaxPropertiesParam];

export const maxPropertiesDef: ISanivaliDef = {
  validator: (max: MaxPropertiesParam) => (v: Record<string, any>) =>
    Object.keys(v).length <= max,
};
