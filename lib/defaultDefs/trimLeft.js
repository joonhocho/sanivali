const leftWS = /^\s+/;
export const trimLeftDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        if (typeof ''.trimLeft === 'function') {
            return (v) => v.trimLeft();
        }
        return (v) => v.replace(leftWS, '');
    },
};
//# sourceMappingURL=trimLeft.js.map