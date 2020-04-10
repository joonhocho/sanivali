import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const itemsDef = {
    validator: (param, context) => {
        const sani = isSanivali(param)
            ? param
            : new Sanivali(param, context.defs);
        if (sani.async) {
            context.rule.async = true;
            return async (v, opts) => {
                const errors = opts.errors;
                const path = opts.path || [];
                const res = await Promise.all(v.map((x, i) => sani.run(x, Object.assign(Object.assign({}, opts), { path: [...path, i] }))));
                const value = res.map((x) => x.value);
                return { fatal: false, errors: errors.length ? errors : null, value };
            };
        }
        return (v, opts) => {
            const value = v.slice();
            const errors = opts.errors;
            const maxErrors = opts.maxErrors;
            const path = opts.path || [];
            for (let i = 0, l = v.length; i < l; i += 1) {
                value[i] = sani.runSync(v[i], Object.assign(Object.assign({}, opts), { path: [...path, i] })).value;
                if (errors.length >= maxErrors) {
                    return { fatal: false, errors, value };
                }
            }
            return { fatal: false, errors: errors.length ? errors : null, value };
        };
    },
    runOnNil: true,
};
//# sourceMappingURL=items.js.map