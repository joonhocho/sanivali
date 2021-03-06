import { isSanivali } from '../util';
export const ifElseDef = {
    validator: (param, context) => {
        let ifRule;
        let thenRule;
        let elseRule;
        if (Array.isArray(param)) {
            [ifRule, thenRule, elseRule] = param;
        }
        else {
            ifRule = param.if;
            thenRule = param.then;
            elseRule = param.else;
        }
        const ifSani = isSanivali(ifRule) ? ifRule : context.createSanivali(ifRule);
        const thenSani = thenRule == null
            ? null
            : isSanivali(thenRule)
                ? thenRule
                : context.createSanivali(thenRule);
        const elseSani = elseRule == null
            ? null
            : isSanivali(elseRule)
                ? elseRule
                : context.createSanivali(elseRule);
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