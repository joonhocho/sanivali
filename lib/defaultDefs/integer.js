import { isInteger } from '../util';
export const integerDef = {
    validator: (enable) => (enable === false ? null : isInteger),
    fatal: true,
};
//# sourceMappingURL=integer.js.map