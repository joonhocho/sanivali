import { ISanivaliDef } from '_src/types';
import { isInteger } from '_src/util';

export type DataType =
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

export type TypeParam = DataType | DataType[];

export type TypeRuleItem = ['type', TypeParam];

const typeTests: { [key in DataType]?: ((x: any) => boolean) | undefined } = {
  undefined: (v) => v === undefined,
  null: (v) => v === null,
  nil: (v) => v == null,
  object: (v) => v != null && typeof v === 'object' && !Array.isArray(v),
  array: Array.isArray,
  integer: (v) => typeof v === 'number' && isInteger(v),
};

const getTest = (p: DataType) =>
  typeTests[p] || ((v: unknown) => typeof v === p);

export const typeDef: ISanivaliDef = {
  validator: (param: TypeParam) => {
    if (Array.isArray(param)) {
      if (param.length === 0) {
        return null;
      }
      if (param.length === 1) {
        return getTest(param[0]);
      }
      const fns = param.map(getTest);
      return (v: unknown) => {
        for (let i = 0, l = fns.length; i < l; i += 1) {
          if (fns[i](v)) return true;
        }
        return false;
      };
    }
    return getTest(param);
  },
  fatal: true,
  runOnNil: true,
};
