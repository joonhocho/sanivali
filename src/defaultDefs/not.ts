import { SanivaliDefaultRuleSchema } from '_src/defaultDefs';
import { ISanivaliDef } from '_src/types';
import { isSanivali } from '_src/util';

import { Sanivali } from '../sanivali';

export type NotParam<T = SanivaliDefaultRuleSchema> = T | Sanivali;

export type NotRuleItem<T = SanivaliDefaultRuleSchema> = ['not', NotParam<T>];

export const notDef: ISanivaliDef = {
  validator: (condition: NotParam, context) => {
    const sani = isSanivali(condition)
      ? condition
      : new Sanivali(condition, context.defs);

    if (sani.async) {
      context.rule.async = true;

      return async (v, opts) => {
        const errors = opts.errors!;
        const maxErrors = opts.maxErrors! - errors.length;

        return !!(await sani.run(v, { ...opts, errors: [], maxErrors })).errors;
      };
    }

    return (v, opts): boolean => {
      const errors = opts.errors!;
      const maxErrors = opts.maxErrors! - errors.length;

      return !!sani.runSync(v, { ...opts, errors: [], maxErrors }).errors;
    };
  },
  runOnNil: true,
};
