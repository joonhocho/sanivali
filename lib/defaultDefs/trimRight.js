const rightWS = /\s+$/;
export const trimRightDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        if (typeof ''.trimRight === 'function') {
            return (v) => v.trimRight();
        }
        return (v) => v.replace(rightWS, '');
    },
};
//# sourceMappingURL=trimRight.js.map