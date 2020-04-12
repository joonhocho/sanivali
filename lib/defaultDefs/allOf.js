import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const allOfDef = {
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
                const maxErrors = opts.maxErrors;
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
        return (v, opts) => {
            const errors = opts.errors;
            const maxErrors = opts.maxErrors;
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
//# sourceMappingURL=allOf.js.map