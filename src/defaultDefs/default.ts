import { ISanivaliDef } from '_src/types';

export type DefaultValue = null | boolean | number | string;

export type DefaultValueThunk = DefaultValue | (() => any);

export type DefaultParam =
  | DefaultValueThunk
  | {
      value: DefaultValueThunk;
      onNull?: boolean;
    };

export type DefaultRuleItem = ['default', DefaultParam];

export const compileDefaultParam = (param: DefaultParam) => {
  let value: DefaultValueThunk;
  let onNull = false;
  if (param && typeof param === 'object') {
    value = param.value;
    onNull = !!param.onNull;
  } else {
    value = param;
  }

  if (typeof value === 'function') {
    const fn = value;
    if (onNull) {
      return (v: unknown) => (v == null ? fn() : v);
    }
    return (v: unknown) => (v === undefined ? fn() : v);
  }

  if (onNull) {
    return (v: unknown) => (v == null ? value : v);
  }
  return (v: unknown) => (v === undefined ? value : v);
};

export const defaultDef: ISanivaliDef = {
  sanitizer: compileDefaultParam,
  runOnNil: true,
};
