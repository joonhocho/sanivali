const { floor } = Math;
export const safeIntegerDef = {
    validator: (enable) => {
        if (enable === false)
            return null;
        if (Number.isSafeInteger) {
            return Number.isSafeInteger;
        }
        const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
        const { abs } = Math;
        return (v) => isFinite(v) && floor(v) === v && abs(v) <= MAX_SAFE_INTEGER;
    },
    fatal: true,
};
//# sourceMappingURL=safeInteger.js.map