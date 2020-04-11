import { ISanivaliDef } from '_src/types';

export type DefaultValue = null | boolean | number | string;

export type DefaultValueThunk = DefaultValue | (() => any);

export type DefaultParam =
  | DefaultValueThunk
  | {
      value: DefaultValueThunk;
      onNull?: boolean;
    }
  | {
      json: string;
      onNull?: boolean;
    };

export type DefaultRuleItem = ['default', DefaultParam];

export const compileDefaultParam = (param: DefaultParam) => {
  let value: DefaultValueThunk;
  let json: string | undefined;
  let onNull = false;
  if (param && typeof param === 'object') {
    value = (param as any).value;
    json = (param as any).json;
    onNull = !!param.onNull;
  } else {
    value = param;
  }

  if (typeof json === 'string') {
    if (onNull) {
      return (v: unknown) => (v == null ? JSON.parse(json as string) : v);
    }
    return (v: unknown) => (v === undefined ? JSON.parse(json as string) : v);
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
