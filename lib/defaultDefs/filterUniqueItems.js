export const filterUniqueItemsDef = {
    sanitizer: (getKey) => {
        if (getKey === false)
            return null;
        if (typeof getKey === 'string') {
            return (v) => v.filter(function (x) {
                const key = x[getKey];
                if (this[key] === 1) {
                    return false;
                }
                this[key] = 1;
                return true;
            }, {});
        }
        if (typeof getKey === 'function') {
            return (v) => v.filter(function (x) {
                const key = getKey(x);
                if (this[key] === 1) {
                    return false;
                }
                this[key] = 1;
                return true;
            }, {});
        }
        return (v) => v.filter(function (x) {
            const key = x;
            if (this[key] === 1) {
                return false;
            }
            this[key] = 1;
            return true;
        }, {});
    },
};
//# sourceMappingURL=filterUniqueItems.js.map