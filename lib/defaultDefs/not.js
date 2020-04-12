import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const notDef = {
    validator: (condition, context) => {
        const sani = isSanivali(condition)
            ? condition
            : new Sanivali(condition, context.defs);
        if (sani.async) {
            context.rule.async = true;
            return async (v, opts) => {
                const errors = opts.errors;
                const maxErrors = opts.maxErrors - errors.length;
                return !!(await sani.run(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors }))).errors;
            };
        }
        return (v, opts) => {
            const errors = opts.errors;
            const maxErrors = opts.maxErrors - errors.length;
            return !!sani.runSync(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors })).errors;
        };
    },
    runOnNil: true,
};
//# sourceMappingURL=not.js.map