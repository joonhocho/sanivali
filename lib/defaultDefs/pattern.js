export const patternDef = {
    validator: (pattern) => {
        const reg = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        return (v) => reg.test(v);
    },
};
//# sourceMappingURL=pattern.js.map