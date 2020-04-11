import { ISanivaliDef } from '_src/types';
import { isSanivali } from '_src/util';

import { Sanivali } from '../sanivali';
import { SanivaliDefaultRuleSchema } from '../defaultDefs';

export type IfElseParam<T = SanivaliDefaultRuleSchema> =
  | {
      if: T | Sanivali;
      then?: T | Sanivali;
      else?: T | Sanivali;
    }
  | [T | Sanivali, T | Sanivali | null, (T | Sanivali | null | undefined)?];

export type IfElseRuleItem<T = SanivaliDefaultRuleSchema> = [
  'ifElse',
  IfElseParam<T>
];

export const ifElseDef: ISanivaliDef = {
  validator: (param: IfElseParam, context) => {
    let ifRule: SanivaliDefaultRuleSchema | Sanivali | null | undefined;
    let thenRule: SanivaliDefaultRuleSchema | Sanivali | null | undefined;
    let elseRule: SanivaliDefaultRuleSchema | Sanivali | null | undefined;

    if (Array.isArray(param)) {
      [ifRule, thenRule, elseRule] = param;
    } else {
      ifRule = param.if;
      thenRule = param.then;
      elseRule = param.else;
    }

    const ifSani = isSanivali(ifRule)
      ? ifRule
      : new Sanivali(ifRule as any, context.defs);

    const thenSani =
      thenRule == null
        ? null
        : isSanivali(thenRule)
        ? thenRule
        : new Sanivali(thenRule as any, context.defs);

    const elseSani =
      elseRule == null
        ? null
        : isSanivali(elseRule)
        ? elseRule
        : new Sanivali(elseRule as any, context.defs);

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
  runOnNil: true,
};
