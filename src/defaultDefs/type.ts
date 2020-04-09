import { ISanivaliDef } from '_src/types';
import { isInteger } from '_src/util';

export type TypeParam =
  | 'array'
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'integer'
  | 'nil'
  | 'null'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export type TypeRuleItem = ['type', TypeParam];

export const typeDef: ISanivaliDef = {
  validator: (param: TypeParam) => {
    if (param === 'undefined') {
      return (v) => v === undefined;
    }
    if (param === 'null') {
      return (v) => v === null;
    }
    if (param === 'nil') {
      return (v) => v == null;
    }
    if (param === 'object') {
      return (v) => v != null && typeof v === 'object' && !Array.isArray(v);
    }
    if (param === 'array') {
      return Array.isArray;
    }
    if (param === 'integer') {
      return (v) => typeof v === 'number' && isInteger(v);
    }
    return (v) => typeof v === param;
  },
  fatal: true,
  runOnNil: true,
};
