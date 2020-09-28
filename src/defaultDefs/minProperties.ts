import type { ISanivaliDef } from '_src/types';

export type MinPropertiesParam = number;

export type MinPropertiesRuleItem = ['minProperties', MinPropertiesParam];

export const minPropertiesDef: ISanivaliDef = {
  validator: (min: MinPropertiesParam) => (v: Record<string, any>) =>
    Object.keys(v).length >= min,
};
