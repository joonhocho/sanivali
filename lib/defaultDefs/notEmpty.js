import { isEmpty } from '../util';
export const notEmptyDef = {
    validator: (keys) => (v) => {
        for (let i = 0, l = keys.length; i < l; i += 1) {
            if (isEmpty(v[keys[i]])) {
                return false;
            }
        }
        return true;
    },
};
//# sourceMappingURL=notEmpty.js.map