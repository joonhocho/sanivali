const leftWS = /^\s+/;
const rightWS = /\s+$/;
export const trimToNullDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        const nil = enable === 'undefined' ? undefined : null;
        return typeof ''.trim === 'function'
            ? (v) => (v && v.trim()) || nil
            : (v) => (v && v.replace(leftWS, '').replace(rightWS, '')) || nil;
    },
};
//# sourceMappingURL=trimToNull.js.map