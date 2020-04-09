import { compileDefaultParam } from './default';
export const defaultPropertiesDef = {
    sanitizer: (depsMap) => {
        const keys = Object.keys(depsMap);
        const sanitizers = keys.map((k) => compileDefaultParam(depsMap[k]));
        return (v) => {
            const newV = Object.assign({}, v);
            for (let i = 0, l = keys.length; i < l; i += 1) {
                const key = keys[i];
                const val = sanitizers[i](newV[key]);
                if (val !== undefined) {
                    newV[key] = val;
                }
            }
            return newV;
        };
    },
};
//# sourceMappingURL=defaultProperties.js.map