import { isEmpty } from '../util';
export const deleteNilPropertiesDef = {
    sanitizer: ({ type, keys, excludeKeys } = {}) => {
        let fn;
        if (type === 'undefined') {
            fn = (x) => x === undefined;
        }
        else if (type === 'null' || type === null) {
            fn = (x) => x === null;
        }
        else if (type === 'empty') {
            fn = isEmpty;
        }
        else {
            fn = (x) => x == null;
        }
        const excludeMap = {};
        if (excludeKeys) {
            for (let i = 0, l = excludeKeys.length; i < l; i += 1) {
                excludeMap[excludeKeys[i]] = 1;
            }
        }
        return (v) => {
            const newV = Object.assign({}, v);
            const ks = keys || Object.keys(newV);
            for (let i = 0, l = ks.length; i < l; i += 1) {
                const key = ks[i];
                if (excludeMap[key] !== 1 && fn(newV[key])) {
                    delete newV[key];
                }
            }
            return newV;
        };
    },
};
//# sourceMappingURL=deleteNilProperties.js.map