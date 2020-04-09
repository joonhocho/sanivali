export const dependenciesDef = {
    validator: (depsMap) => {
        const keys = Object.keys(depsMap);
        return (v) => {
            for (let i = 0, l = keys.length; i < l; i += 1) {
                const key = keys[i];
                if (v[key] !== undefined) {
                    const deps = depsMap[key];
                    for (let j = 0, jl = deps.length; j < jl; j += 1) {
                        if (v[deps[j]] === undefined) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
    },
};
//# sourceMappingURL=dependencies.js.map