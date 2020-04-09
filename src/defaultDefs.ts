import { Sanivali } from './sanivali';
import {
  ISanivaliDefMap,
  ISanivaliError,
  ISanivaliResult,
  SanivaliRuleInput,
} from './types';
import { isSanivali, isEmptyObject } from './util';

const leftWS = /^\s+/;
const rightWS = /\s+$/;

const { floor } = Math;
const isInteger = Number.isInteger || ((v) => isFinite(v) && floor(v) === v);

export const defaultDefs: ISanivaliDefMap = {
  // general sanitizers
  default: {
    sanitizer: (opts) => {
      let value = opts;
      let onNull = false;
      if (opts && typeof opts === 'object') {
        value = opts.value;
        onNull = opts.onNull;
      }

      if (typeof value === 'function') {
        if (onNull) {
          return (v) => (v == null ? value() : v);
        }
        return (v) => (v === undefined ? value() : v);
      }
      if (onNull) {
        return (v) => (v == null ? value : v);
      }
      return (v) => (v === undefined ? value : v);
    },
  },
  emptyToNull: {
    sanitizer: (enable = true) => {
      if (!enable) return null;
      return (v) => (v == null || v === '' || isEmptyObject(v) ? null : v);
    },
  },

  // general validators
  invalid: {
    validator: () => () => false,
  },
  type: {
    validator: (type: string) => {
      if (type === 'undefined') {
        return (v) => v === undefined;
      }
      if (type === 'null') {
        return (v) => v === null;
      }
      if (type === 'nil') {
        return (v) => v == null;
      }
      if (type === 'object') {
        return (v) => v != null && typeof v === 'object' && !Array.isArray(v);
      }
      if (type === 'array') {
        return Array.isArray;
      }
      if (type === 'integer') {
        return (v) => typeof v === 'number' && isInteger(v);
      }
      return (v) => typeof v === type;
    },
    fatal: true,
  },
  instance: {
    validator: (Class) => (v) => v instanceof Class,
    fatal: true,
  },
  enum: {
    validator: (enums: any[]) => {
      if (enums.length <= 5) {
        return (v) => enums.indexOf(v) !== -1;
      }
      const enumMap: { [type: string]: { [key: string]: 1 } } = {};
      for (let i = 0, l = enums.length; i < l; i += 1) {
        const v = enums[i];
        const type = typeof v;
        (enumMap[type] || (enumMap[type] = {}))[v] = 1;
      }
      return (v) => {
        const type = typeof v;
        return type in enumMap && enumMap[type][v] === 1;
      };
    },
    fatal: true,
  },

  // number sanitizers
  parseInt: {
    sanitizer: (opts) => {
      const radix = typeof opts === 'number' ? opts : 10;
      return (v) => {
        try {
          const n = parseInt(v, radix);
          return n === n ? n : null;
        } catch (e) {
          return null;
        }
      };
    },
  },
  parseFloat: {
    sanitizer: () => (v) => {
      try {
        const n = parseFloat(v);
        return n === n ? n : null;
      } catch (e) {
        return null;
      }
    },
  },

  // number validators
  finite: {
    validator: () => isFinite,
    fatal: true,
  },
  integer: {
    validator: () => isInteger,
    fatal: true,
  },
  safeInteger: {
    validator: () => {
      if (Number.isSafeInteger) {
        return Number.isSafeInteger;
      }

      const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
      const { abs } = Math;
      return (v) => isFinite(v) && floor(v) === v && abs(v) <= MAX_SAFE_INTEGER;
    },
    fatal: true,
  },
  minimum: {
    validator: (min: number) => (v) => v >= min,
  },
  exclusiveMinimum: {
    validator: (min: number) => (v) => v > min,
  },

  maximum: {
    validator: (max: number) => (v) => v <= max,
  },
  exclusiveMaximum: {
    validator: (max: number) => (v) => v < max,
  },

  // string sanitizers
  trim: {
    sanitizer: (enable = true) => {
      if (!enable) return null;
      if (typeof ''.trim === 'function') {
        return (v) => v.trim();
      }
      return (v) => v.replace(leftWS, '').replace(rightWS, '');
    },
  },
  trimLeft: {
    sanitizer: (enable = true) => {
      if (!enable) return null;
      if (typeof ''.trimLeft === 'function') {
        return (v) => v.trimLeft();
      }
      return (v) => v.replace(leftWS, '');
    },
  },
  trimRight: {
    sanitizer: (enable = true) => {
      if (!enable) return null;
      if (typeof ''.trimRight === 'function') {
        return (v) => v.trimRight();
      }
      return (v) => v.replace(rightWS, '');
    },
  },
  trimToNull: {
    sanitizer: (enable = true) => {
      if (!enable) return null;
      if (typeof ''.trim === 'function') {
        return (v) => (v && v.trim()) || null;
      }
      return (v) => (v && v.replace(leftWS, '').replace(rightWS, '')) || null;
    },
  },

  toLocaleLowerCase: {
    sanitizer: (locales?: string | string[]) => (x: string) =>
      x.toLocaleLowerCase(locales),
  },
  toLocaleUpperCase: {
    sanitizer: (locales?: string | string[]) => (x: string) =>
      x.toLocaleUpperCase(locales),
  },
  toLowerCase: {
    sanitizer: () => (x: string) => x.toLowerCase(),
  },
  toUpperCase: {
    sanitizer: () => (x: string) => x.toUpperCase(),
  },

  // string validators
  minLength: {
    validator: (min: number) => (v) => v.length >= min,
  },
  maxLength: {
    validator: (max: number) => (v) => v.length <= max,
  },
  pattern: {
    validator: (pattern: string | RegExp) => {
      const reg = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      return (v) => reg.test(v);
    },
  },

  // date sanitizer
  toDate: {
    sanitizer: () => (x: number | string | Date): Date | null => {
      const date = new Date(x);
      const t = date.getTime();
      return t === t ? date : null;
    },
  },
  toTimestamp: {
    sanitizer: () => (x: number | string | Date): number | null => {
      const date = new Date(x);
      const t = date.getTime();
      return t === t ? t : null;
    },
  },

  // array sanitizers
  filterItems: {
    sanitizer: (fn: (x: any, i: number) => boolean) => (v: any[]) =>
      v.filter(fn),
  },

  removeDuplicateItems: {
    sanitizer: (getKey?: string | ((x: any) => string)) => {
      if (typeof getKey === 'string') {
        return (v: any[]) => {
          const keyMap = {} as Record<string, 1>;
          const filtered = [] as any[];
          for (let i = 0, l = v.length; i < l; i += 1) {
            const x = v[i];
            const key = x[getKey];
            if (keyMap[key] !== 1) {
              keyMap[key] = 1;
              filtered.push(x);
            }
          }
          return filtered;
        };
      }
      if (getKey) {
        return (v: any[]) => {
          const keyMap = {} as Record<string, 1>;
          const filtered = [] as any[];
          for (let i = 0, l = v.length; i < l; i += 1) {
            const x = v[i];
            const key = getKey(x);
            if (keyMap[key] !== 1) {
              keyMap[key] = 1;
              filtered.push(x);
            }
          }
          return filtered;
        };
      }
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        const filtered = [] as any[];
        for (let i = 0, l = v.length; i < l; i += 1) {
          const x = v[i];
          if (keyMap[x] !== 1) {
            keyMap[x] = 1;
            filtered.push(x);
          }
        }
        return filtered;
      };
    },
  },

  removeNilItems: {
    sanitizer: (type?: 'undefined' | 'null' | null | 'nil') => {
      let fn: (x: unknown) => boolean;
      if (type === 'undefined') {
        fn = (x) => x !== undefined;
      } else if (type === 'null' || type === null) {
        fn = (x) => x !== null;
      } else {
        // nil
        fn = (x) => x != null;
      }

      return (v: any[]) => v.filter(fn);
    },
  },

  // array validators
  minItems: {
    validator: (min: number) => (v: any[]) => v.length >= min,
  },
  maxItems: {
    validator: (max: number) => (v: any[]) => v.length <= max,
  },
  uniqueItems: {
    validator: (getKey?: (x: any) => string) => {
      if (typeof getKey === 'string') {
        return (v: any[]) => {
          const keyMap = {} as Record<string, 1>;
          for (let i = 0, l = v.length; i < l; i += 1) {
            const key = v[i][getKey];
            if (keyMap[key] === 1) {
              return false;
            }
            keyMap[key] = 1;
          }
          return true;
        };
      }
      if (getKey) {
        return (v: any[]) => {
          const keyMap = {} as Record<string, 1>;
          for (let i = 0, l = v.length; i < l; i += 1) {
            const key = getKey(v[i]);
            if (keyMap[key] === 1) {
              return false;
            }
            keyMap[key] = 1;
          }
          return true;
        };
      }
      return (v: any[]) => {
        const keyMap = {} as Record<string, 1>;
        for (let i = 0, l = v.length; i < l; i += 1) {
          const key = v[i];
          if (keyMap[key] === 1) {
            return false;
          }
          keyMap[key] = 1;
        }
        return true;
      };
    },
  },
  items: {
    validator: (rulesOrSani: SanivaliRuleInput | Sanivali, context) => {
      const sani = isSanivali(rulesOrSani)
        ? rulesOrSani
        : new Sanivali(rulesOrSani, context.defs, context.path);

      if (sani.async) {
        context.rule.async = true;

        return async (v: any[], opts): Promise<ISanivaliResult> => {
          const errors = opts.errors!;
          const path = opts.path || [];

          const res = await Promise.all(
            v.map((x, i) => sani.run(x, { ...opts, path: [...path, i] }))
          );
          const value = res.map((x) => x.value);

          return { fatal: false, errors: errors.length ? errors : null, value };
        };
      }

      return (v: any[], opts): ISanivaliResult => {
        const value = v.slice();
        const errors = opts.errors!;
        const maxErrors = opts.maxErrors!;
        const path = opts.path || [];

        for (let i = 0, l = v.length; i < l; i += 1) {
          value[i] = sani.runSync(v[i], { ...opts, path: [...path, i] }).value;
          if (errors.length >= maxErrors) {
            return { fatal: false, errors, value };
          }
        }

        return { fatal: false, errors: errors.length ? errors : null, value };
      };
    },
  },

  // object sanitizer
  filterProperties: {
    sanitizer: (fn: (val: any, key: string) => boolean) => {
      return (v: Record<string, any>) => {
        const newV = { ...v };
        const ks = Object.keys(newV);
        for (let i = 0, l = ks.length; i < l; i += 1) {
          const key = ks[i];
          if (!fn(newV[key], key)) {
            delete newV[key];
          }
        }
        return newV;
      };
    },
  },

  deleteNilProperties: {
    sanitizer: ({
      type,
      keys,
      excludeKeys,
    }: {
      type?: 'undefined' | 'null' | null | 'nil';
      keys?: string[];
      excludeKeys?: string[];
    } = {}) => {
      let fn: (x: unknown) => boolean;
      if (type === 'undefined') {
        fn = (x) => x === undefined;
      } else if (type === 'null' || type === null) {
        fn = (x) => x === null;
      } else {
        // nil
        fn = (x) => x == null;
      }

      const excludeMap = {} as Record<string, 1>;
      if (excludeKeys) {
        for (let i = 0, l = excludeKeys.length; i < l; i += 1) {
          excludeMap[excludeKeys[i]] = 1;
        }
      }

      return (v: Record<string, any>) => {
        const newV = { ...v };
        const ks = keys || Object.keys(newV);
        for (let i = 0, l = ks.length; i < l; i += 1) {
          const key = ks[i];
          if (excludeMap[key] !== 1 && fn(newV[key])) {
            delete newV[key];
          }
        }
        return newV;
      };
    },
  },

  // object validators
  required: {
    validator: (keys: string[]) => (v: Record<string, any>) => {
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const key = keys[i];
        if (v[key] === undefined) {
          return false;
        }
      }
      return true;
    },
  },

  minProperties: {
    validator: (min: number) => (v: Record<string, any>) =>
      Object.keys(v).length >= min,
  },

  maxProperties: {
    validator: (max: number) => (v: Record<string, any>) =>
      Object.keys(v).length <= max,
  },

  dependencies: {
    validator: (depsMap: Record<string, string[]>) => {
      const keys = Object.keys(depsMap);
      return (v: Record<string, any>) => {
        for (let i = 0, l = keys.length; i < l; i += 1) {
          const key = keys[i];
          if (v[key] !== undefined) {
            const deps = depsMap[key];
            for (let j = 0, jl = deps.length; j < jl; j += 1) {
              if (v[deps[j]] === undefined) {
                return false;
              }
            }
          }
        }
        return true;
      };
    },
  },

  properties: {
    validator: (
      props: { [key: string]: SanivaliRuleInput | Sanivali },
      context
    ) => {
      const keys = Object.keys(props);
      const stringKeyMap: Record<string, 1> = {};
      const stringKeys = [] as Array<[string, Sanivali]>;
      const patternKeys = [] as Array<[RegExp, Sanivali]>;
      const regexKeyPattern = /^\/.*\/i?$/;

      let async = false;
      for (let i = 0, l = keys.length; i < l; i += 1) {
        const key = keys[i];
        const propRules = props[key];

        const sani = isSanivali(propRules)
          ? propRules
          : new Sanivali(propRules, context.defs, context.path);

        async = async || sani.async;

        if (key.length > 2 && regexKeyPattern.test(key)) {
          // pattern key
          if (key[key.length - 1] === 'i') {
            patternKeys.push([
              new RegExp(key.substring(1, key.length - 2), 'i'),
              sani,
            ]);
          } else {
            patternKeys.push([
              new RegExp(key.substring(1, key.length - 1)),
              sani,
            ]);
          }
        } else {
          stringKeyMap[key] = 1;
          stringKeys.push([key, sani]);
        }
      }

      if (async) {
        context.rule.async = true;

        return async (
          v: { [key: string]: any },
          opts
        ): Promise<ISanivaliResult> => {
          const errors = opts.errors!;
          const path = opts.path || [];

          const promises = stringKeys.map(([key, sani]) =>
            sani.run(v[key], { ...opts, path: [...path, key] })
          );

          const vKeys = Object.keys(v);
          const matchedKeys = [] as string[];
          for (let i = 0, l = vKeys.length; i < l; i += 1) {
            const key = vKeys[i];
            if (stringKeyMap[key] !== 1) {
              for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
                const [regex, sani] = patternKeys[j];
                if (regex.test(key)) {
                  matchedKeys.push(key);
                  promises.push(
                    sani.run(v[key], { ...opts, path: [...path, key] })
                  );
                  break;
                }
              }
            }
          }

          const results = await Promise.all(promises);

          const value = { ...v };
          for (let i = 0, l = stringKeys.length; i < l; i += 1) {
            value[stringKeys[i][0]] = results[i].value;
          }
          for (
            let i = 0, l = matchedKeys.length, sl = stringKeys.length;
            i < l;
            i += 1
          ) {
            value[matchedKeys[i]] = results[sl + i].value;
          }

          return { fatal: false, errors: errors.length ? errors : null, value };
        };
      }

      return (v: { [key: string]: any }, opts): ISanivaliResult => {
        const errors = opts.errors!;
        const maxErrors = opts.maxErrors!;
        const path = opts.path || [];

        const value = { ...v };
        for (let i = 0, l = stringKeys.length; i < l; i += 1) {
          const [key, sani] = stringKeys[i];

          const res = sani.runSync(v[key], { ...opts, path: [...path, key] });
          value[key] = res.value;

          if (errors.length >= maxErrors) {
            return { fatal: false, errors, value };
          }
        }

        const vKeys = Object.keys(v);
        for (let i = 0, l = vKeys.length; i < l; i += 1) {
          const key = vKeys[i];
          if (stringKeyMap[key] !== 1) {
            for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
              const [regex, sani] = patternKeys[j];
              if (regex.test(key)) {
                const res = sani.runSync(v[key], {
                  ...opts,
                  path: [...path, key],
                });
                value[key] = res.value;

                if (errors.length >= maxErrors) {
                  return { fatal: false, errors, value };
                }
                break;
              }
            }
          }
        }

        return { fatal: false, errors: errors.length ? errors : null, value };
      };
    },
  },

  // combining
  anyOf: {
    validator: (conditions: Array<SanivaliRuleInput | Sanivali>, context) => {
      let async = false;
      const sanis = conditions.map((x) => {
        const sani = isSanivali(x)
          ? x
          : new Sanivali(x, context.defs, context.path);
        async = async || sani.async;
        return sani;
      });

      if (async) {
        context.rule.async = true;

        return async (v, opts) => {
          const errors = opts.errors!;
          const maxErrors = opts.maxErrors! - errors.length;

          const results = await Promise.all(
            sanis.map((x) => x.run(v, { ...opts, errors: [], maxErrors }))
          );

          const allErrors: ISanivaliError[] = [];
          for (let i = 0, l = results.length; i < l; i += 1) {
            const res = results[i];
            if (!res.errors) {
              return { ...res, errors: errors.length ? errors : null };
            }
            allErrors.push(...res.errors);
          }

          errors.push(...allErrors);

          return {
            fatal: false,
            errors: errors.length ? errors : null,
            value: v,
          };
        };
      }

      return (v, opts): ISanivaliResult => {
        const errors = opts.errors!;
        const maxErrors = opts.maxErrors! - errors.length;
        const allErrors: ISanivaliError[] = [];

        for (let i = 0, l = sanis.length; i < l; i += 1) {
          const res = sanis[i].runSync(v, {
            ...opts,
            errors: [],
            maxErrors,
          });
          if (!res.errors) {
            return { ...res, errors: errors.length ? errors : null };
          }
          allErrors.push(...res.errors);
        }

        errors.push(...allErrors);

        return {
          fatal: false,
          errors: errors.length ? errors : null,
          value: v,
        };
      };
    },
  },

  // conditional
  ifElse: {
    validator: (
      {
        if: ifRule,
        then: thenRule,
        else: elseRule,
      }: {
        if: SanivaliRuleInput | Sanivali;
        then?: SanivaliRuleInput | Sanivali;
        else?: SanivaliRuleInput | Sanivali;
      },
      context
    ) => {
      const ifSani = isSanivali(ifRule)
        ? ifRule
        : new Sanivali(ifRule, context.defs, context.path);

      const thenSani =
        thenRule == null
          ? null
          : isSanivali(thenRule)
          ? thenRule
          : new Sanivali(thenRule, context.defs, context.path);

      const elseSani =
        elseRule == null
          ? null
          : isSanivali(elseRule)
          ? elseRule
          : new Sanivali(elseRule, context.defs, context.path);

      if (
        ifSani.async ||
        (thenSani && thenSani.async) ||
        (elseSani && elseSani.async)
      ) {
        context.rule.async = true;

        return async (v, opts) => {
          if (
            (await ifSani.run(v, { ...opts, maxErrors: 1, errors: [] })).errors
          ) {
            return elseSani ? elseSani.run(v, opts) : true;
          }
          return thenSani ? thenSani.run(v, opts) : true;
        };
      }

      return (v, opts) => {
        if (ifSani.runSync(v, { ...opts, maxErrors: 1, errors: [] }).errors) {
          return elseSani ? elseSani.runSync(v, opts) : true;
        }
        return thenSani ? thenSani.runSync(v, opts) : true;
      };
    },
  },
};
