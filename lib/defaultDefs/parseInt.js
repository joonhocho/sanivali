export const parseIntDef = {
    sanitizer: (opts) => {
        if (opts === false)
            return null;
        const radix = typeof opts === 'number' ? opts : 10;
        return (v) => {
            try {
                const n = parseInt(v, radix);
                return n === n ? n : null;
            }
            catch (e) {
                return null;
            }
        };
    },
};
//# sourceMappingURL=parseInt.js.map