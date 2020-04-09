export const removeDuplicateItemsDef = {
    sanitizer: (getKey) => {
        if (typeof getKey === 'string') {
            return (v) => {
                const keyMap = {};
                const filtered = [];
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const x = v[i];
                    const key = x[getKey];
                    if (keyMap[key] !== 1) {
                        keyMap[key] = 1;
                        filtered.push(x);
                    }
                }
                return filtered;
            };
        }
        if (getKey) {
            return (v) => {
                const keyMap = {};
                const filtered = [];
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const x = v[i];
                    const key = getKey(x);
                    if (keyMap[key] !== 1) {
                        keyMap[key] = 1;
                        filtered.push(x);
                    }
                }
                return filtered;
            };
        }
        return (v) => {
            const keyMap = {};
            const filtered = [];
            for (let i = 0, l = v.length; i < l; i += 1) {
                const x = v[i];
                if (keyMap[x] !== 1) {
                    keyMap[x] = 1;
                    filtered.push(x);
                }
            }
            return filtered;
        };
    },
};
//# sourceMappingURL=removeDuplicateItems.js.map