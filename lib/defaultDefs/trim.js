const leftWS = /^\s+/;
const rightWS = /\s+$/;
export const trimDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        if (typeof ''.trim === 'function') {
            return (v) => v.trim();
        }
        return (v) => v.replace(leftWS, '').replace(rightWS, '');
    },
};
//# sourceMappingURL=trim.js.map