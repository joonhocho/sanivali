import { isEmpty } from '../util';
export const emptyToNullDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        const nil = enable === 'undefined' ? undefined : null;
        return (v) => (isEmpty(v) ? nil : v);
    },
    runOnNil: true,
};
//# sourceMappingURL=emptyToNull.js.map