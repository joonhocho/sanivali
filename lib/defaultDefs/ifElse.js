import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const ifElseDef = {
    validator: ({ if: ifRule, then: thenRule, else: elseRule }, context) => {
        const ifSani = isSanivali(ifRule)
            ? ifRule
            : new Sanivali(ifRule, context.defs);
        const thenSani = thenRule == null
            ? null
            : isSanivali(thenRule)
                ? thenRule
                : new Sanivali(thenRule, context.defs);
        const elseSani = elseRule == null
            ? null
            : isSanivali(elseRule)
                ? elseRule
                : new Sanivali(elseRule, context.defs);
        if (ifSani.async ||
            (thenSani && thenSani.async) ||
            (elseSani && elseSani.async)) {
            context.rule.async = true;
            return async (v, opts) => {
                if ((await ifSani.run(v, Object.assign(Object.assign({}, opts), { maxErrors: 1, errors: [] }))).errors) {
                    return elseSani ? elseSani.run(v, opts) : true;
                }
                return thenSani ? thenSani.run(v, opts) : true;
            };
        }
        return (v, opts) => {
            if (ifSani.runSync(v, Object.assign(Object.assign({}, opts), { maxErrors: 1, errors: [] })).errors) {
                return elseSani ? elseSani.runSync(v, opts) : true;
            }
            return thenSani ? thenSani.runSync(v, opts) : true;
        };
    },
    runOnNil: true,
};
//# sourceMappingURL=ifElse.js.map