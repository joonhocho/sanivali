export const defaultDef = {
    sanitizer: (param) => {
        let value;
        let onNull = false;
        if (param && typeof param === 'object') {
            value = param.value;
            onNull = !!param.onNull;
        }
        else {
            value = param;
        }
        if (typeof value === 'function') {
            const fn = value;
            if (onNull) {
                return (v) => (v == null ? fn() : v);
            }
            return (v) => (v === undefined ? fn() : v);
        }
        if (onNull) {
            return (v) => (v == null ? value : v);
        }
        return (v) => (v === undefined ? value : v);
    },
};
//# sourceMappingURL=default.js.map