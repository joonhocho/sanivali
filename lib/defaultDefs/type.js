import { isInteger } from '../util';
export const typeDef = {
    validator: (param) => {
        if (param === 'undefined') {
            return (v) => v === undefined;
        }
        if (param === 'null') {
            return (v) => v === null;
        }
        if (param === 'nil') {
            return (v) => v == null;
        }
        if (param === 'object') {
            return (v) => v != null && typeof v === 'object' && !Array.isArray(v);
        }
        if (param === 'array') {
            return Array.isArray;
        }
        if (param === 'integer') {
            return (v) => typeof v === 'number' && isInteger(v);
        }
        return (v) => typeof v === param;
    },
    fatal: true,
};
//# sourceMappingURL=type.js.map