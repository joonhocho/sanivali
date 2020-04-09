export const uniqueItemsDef = {
    validator: (getKey) => {
        if (typeof getKey === 'string') {
            return (v) => {
                const keyMap = {};
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const key = v[i][getKey];
                    if (keyMap[key] === 1) {
                        return false;
                    }
                    keyMap[key] = 1;
                }
                return true;
            };
        }
        if (getKey) {
            return (v) => {
                const keyMap = {};
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const key = getKey(v[i]);
                    if (keyMap[key] === 1) {
                        return false;
                    }
                    keyMap[key] = 1;
                }
                return true;
            };
        }
        return (v) => {
            const keyMap = {};
            for (let i = 0, l = v.length; i < l; i += 1) {
                const key = v[i];
                if (keyMap[key] === 1) {
                    return false;
                }
                keyMap[key] = 1;
            }
            return true;
        };
    },
};
//# sourceMappingURL=uniqueItems.js.map