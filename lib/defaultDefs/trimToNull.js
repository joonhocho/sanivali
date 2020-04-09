const leftWS = /^\s+/;
const rightWS = /\s+$/;
export const trimToNullDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        if (typeof ''.trim === 'function') {
            return (v) => (v && v.trim()) || null;
        }
        return (v) => (v && v.replace(leftWS, '').replace(rightWS, '')) || null;
    },
};
//# sourceMappingURL=trimToNull.js.map