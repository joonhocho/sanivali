import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const anyOfDef = {
    validator: (conditions, context) => {
        let async = false;
        const sanis = conditions.map((x) => {
            const sani = isSanivali(x) ? x : new Sanivali(x, context.defs);
            async = async || sani.async;
            return sani;
        });
        if (async) {
            context.rule.async = true;
            return async (v, opts) => {
                const errors = opts.errors;
                const maxErrors = opts.maxErrors - errors.length;
                const results = await Promise.all(sanis.map((x) => x.run(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors }))));
                const allErrors = [];
                for (let i = 0, l = results.length; i < l; i += 1) {
                    const res = results[i];
                    if (!res.errors) {
                        return Object.assign(Object.assign({}, res), { errors: errors.length ? errors : null });
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
        return (v, opts) => {
            const errors = opts.errors;
            const maxErrors = opts.maxErrors - errors.length;
            const allErrors = [];
            for (let i = 0, l = sanis.length; i < l; i += 1) {
                const res = sanis[i].runSync(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors }));
                if (!res.errors) {
                    return Object.assign(Object.assign({}, res), { errors: errors.length ? errors : null });
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
//# sourceMappingURL=anyOf.js.map