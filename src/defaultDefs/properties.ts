import type { SanivaliDefaultRuleSchema } from '_src/defaultDefsTypes';
import type { ISanivaliDef, ISanivaliResult } from '_src/types';
import { ANY_KEY, isSanivali } from '_src/util';
import type { Sanivali } from '../sanivali';

export type PropertiesParam<T = SanivaliDefaultRuleSchema> = {
  [key: string]: T | Sanivali;
};

export type PropertiesRuleItem<T = SanivaliDefaultRuleSchema> = [
  'properties',
  PropertiesParam<T>
];

export const propertiesDef: ISanivaliDef = {
  validator: (props: PropertiesParam, context) => {
    const keys = Object.keys(props);
    const stringKeyMap: Record<string, 1> = {};
    const stringKeys = [] as Array<[string, Sanivali]>;
    const patternKeys = [] as Array<[typeof ANY_KEY | RegExp, Sanivali]>;
    const regexKeyPattern = /^\/.*\/i?$/;

    let async = false;
    for (let i = 0, l = keys.length; i < l; i += 1) {
      const key = keys[i];
      const propRules = props[key];

      const sani = isSanivali(propRules)
        ? propRules
        : context.createSanivali(propRules);

      async = async || sani.async;

      if (key === ANY_KEY) {
        patternKeys.push([ANY_KEY, sani]);
      } else if (key.length > 2 && regexKeyPattern.test(key)) {
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
        raw: { [key: string]: any },
        opts
      ): Promise<ISanivaliResult> => {
        const errors = opts.errors!;
        const path = opts.path || [];

        const promises = stringKeys.map(([key, sani]) =>
          key in raw
            ? sani.run(raw[key], { ...opts, path: [...path, key] })
            : null
        );

        const vKeys = Object.keys(raw);
        const matchedKeys = [] as string[];
        for (let i = 0, l = vKeys.length; i < l; i += 1) {
          const key = vKeys[i];
          if (stringKeyMap[key] !== 1) {
            for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
              const [regex, sani] = patternKeys[j];
              if (regex === ANY_KEY || regex.test(key)) {
                matchedKeys.push(key);
                promises.push(
                  sani.run(raw[key], { ...opts, path: [...path, key] })
                );
                break;
              }
            }
          }
        }

        const results = await Promise.all(promises);

        const value = { ...raw };
        for (let i = 0, l = stringKeys.length; i < l; i += 1) {
          const result = results[i];
          if (result) {
            const newPropValue = result.value;
            const key = stringKeys[i][0];
            if (newPropValue === undefined) {
              delete value[key];
            } else {
              value[key] = newPropValue;
            }
          }
        }
        for (
          let i = 0, l = matchedKeys.length, sl = stringKeys.length;
          i < l;
          i += 1
        ) {
          const newPropValue = results[sl + i]!.value;
          const key = matchedKeys[i];
          if (newPropValue === undefined) {
            delete value[key];
          } else {
            value[key] = newPropValue;
          }
        }

        return { fatal: false, errors: errors.length ? errors : null, value };
      };
    }

    return (raw: { [key: string]: any }, opts): ISanivaliResult => {
      const errors = opts.errors!;
      const maxErrors = opts.maxErrors!;
      const path = opts.path || [];

      const value = { ...raw };
      for (let i = 0, l = stringKeys.length; i < l; i += 1) {
        const [key, sani] = stringKeys[i];

        if (key in value) {
          const res = sani.runSync(value[key], {
            ...opts,
            path: [...path, key],
          });

          const newPropValue = res.value;
          if (newPropValue === undefined) {
            delete value[key];
          } else {
            value[key] = newPropValue;
          }

          if (errors.length >= maxErrors) {
            return { fatal: false, errors, value };
          }
        }
      }

      const vKeys = Object.keys(value);
      for (let i = 0, l = vKeys.length; i < l; i += 1) {
        const key = vKeys[i];
        if (stringKeyMap[key] !== 1) {
          for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
            const [regex, sani] = patternKeys[j];
            if (regex === ANY_KEY || regex.test(key)) {
              const res = sani.runSync(value[key], {
                ...opts,
                path: [...path, key],
              });

              const newPropValue = res.value;
              if (newPropValue === undefined) {
                delete value[key];
              } else {
                value[key] = newPropValue;
              }

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
};
