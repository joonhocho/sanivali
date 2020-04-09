export const filterPropertiesDef = {
    sanitizer: (fn) => {
        return (v) => {
            const newV = Object.assign({}, v);
            const ks = Object.keys(newV);
            for (let i = 0, l = ks.length; i < l; i += 1) {
                const key = ks[i];
                if (!fn(newV[key], key, newV)) {
                    delete newV[key];
                }
            }
            return newV;
        };
    },
};
//# sourceMappingURL=filterProperties.js.map