import { ISanivaliDef, ISanivaliResult } from '_src/types';
import { isSanivali } from '_src/util';

import { SanivaliDefaultRuleSchema } from '../defaultDefs';
import { Sanivali } from '../sanivali';

export type ItemsParam<T = SanivaliDefaultRuleSchema> = T | Sanivali;

export type ItemsRuleItem<T = SanivaliDefaultRuleSchema> = [
  'items',
  ItemsParam<T>
];

export const itemsDef: ISanivaliDef = {
  validator: (param: ItemsParam, context) => {
    const sani = isSanivali(param)
      ? param
      : new Sanivali(param as any, context.defs, context.path);

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
  runOnNil: true,
};
