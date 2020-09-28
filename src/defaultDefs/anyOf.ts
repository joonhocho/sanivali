import type { SanivaliDefaultRuleSchema } from '_src/defaultDefsTypes';
import type { ISanivaliDef, ISanivaliError, ISanivaliResult } from '_src/types';
import { isSanivali } from '_src/util';
import type { Sanivali } from '../sanivali';

export type AnyOfParam<T = SanivaliDefaultRuleSchema> = Array<T | Sanivali>;

export type AnyOfRuleItem<T = SanivaliDefaultRuleSchema> = [
  'anyOf',
  AnyOfParam<T>
];

export const anyOfDef: ISanivaliDef = {
  validator: (conditions: AnyOfParam, context) => {
    let async = false;
    const sanis = conditions.map((x) => {
      const sani = isSanivali(x) ? x : context.createSanivali(x);
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
  runOnNil: true,
};
