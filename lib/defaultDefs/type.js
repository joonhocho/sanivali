import { isInteger } from '../util';
const typeTests = {
    undefined: (v) => v === undefined,
    null: (v) => v === null,
    nil: (v) => v == null,
    object: (v) => v != null && typeof v === 'object' && !Array.isArray(v),
    array: Array.isArray,
    integer: (v) => typeof v === 'number' && isInteger(v),
};
export const typeDef = {
    validator: (param) => {
        if (Array.isArray(param)) {
            const fns = param.map((p) => typeTests[p] || ((v) => typeof v === p));
            return (v) => {
                for (let i = 0, l = fns.length; i < l; i += 1) {
                    if (fns[i](v))
                        return true;
                }
                return false;
            };
        }
        return typeTests[param] || ((v) => typeof v === param);
    },
    fatal: true,
    runOnNil: true,
};
//# sourceMappingURL=type.js.map