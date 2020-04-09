import { isEmpty } from '../util';
export const emptyToNullDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        return (v) => (isEmpty(v) ? null : v);
    },
};
//# sourceMappingURL=emptyToNull.js.map