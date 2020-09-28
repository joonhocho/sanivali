import type { SanivaliDefaultRuleSchema } from '_src/defaultDefsTypes';
import type { ISanivaliDef, ISanivaliResult } from '_src/types';
import { isSanivali } from '_src/util';
import type { Sanivali } from '../sanivali';

export type AllOfParam<T = SanivaliDefaultRuleSchema> = Array<T | Sanivali>;

export type AllOfRuleItem<T = SanivaliDefaultRuleSchema> = [
  'allOf',
  AllOfParam<T>
];

export const allOfDef: ISanivaliDef = {
  validator: (conditions: AllOfParam, context) => {
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
        const maxErrors = opts.maxErrors!;

        let fatal = false;
        let newV = v;
        for (let i = 0, l = sanis.length; i < l; i += 1) {
          const sani = sanis[i];
          const res = sani.async
            ? await sani.runAsync(newV, opts)
            : sani.runSync(newV, opts);
          newV = res.value;
          fatal = res.fatal || fatal;
          if (errors.length >= maxErrors) {
            break;
          }
        }

        return { fatal, errors, value: newV };
      };
    }

    return (v, opts): ISanivaliResult | boolean => {
      const errors = opts.errors!;
      const maxErrors = opts.maxErrors!;

      let fatal = false;
      let newV = v;
      for (let i = 0, l = sanis.length; i < l; i += 1) {
        const res = sanis[i].runSync(newV, opts);
        newV = res.value;
        fatal = res.fatal || fatal;
        if (errors.length >= maxErrors) {
          break;
        }
      }

      return { fatal, errors, value: newV };
    };
  },
  runOnNil: true,
};
