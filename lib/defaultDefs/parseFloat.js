export const parseFloatDef = {
    sanitizer: (enable) => {
        if (enable === false)
            return null;
        return (v) => {
            try {
                const n = parseFloat(v);
                return n === n ? n : null;
            }
            catch (e) {
                return null;
            }
        };
    },
};
//# sourceMappingURL=parseFloat.js.map