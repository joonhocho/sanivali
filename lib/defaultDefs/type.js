import { isInteger } from '../util';
const typeTests = {
    undefined: (v) => v === undefined,
    null: (v) => v === null,
    nil: (v) => v == null,
    object: (v) => v != null && typeof v === 'object' && !Array.isArray(v),
    array: Array.isArray,
    integer: (v) => typeof v === 'number' && isInteger(v),
};
const getTest = (p) => typeTests[p] || ((v) => typeof v === p);
export const typeDef = {
    validator: (param) => {
        if (Array.isArray(param)) {
            if (param.length === 0) {
                return null;
            }
            if (param.length === 1) {
                return getTest(param[0]);
            }
            const fns = param.map(getTest);
            return (v) => {
                for (let i = 0, l = fns.length; i < l; i += 1) {
                    if (fns[i](v))
                        return true;
                }
                return false;
            };
        }
        return getTest(param);
    },
    fatal: true,
    runOnNil: true,
};
//# sourceMappingURL=type.js.map