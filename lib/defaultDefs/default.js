export const compileDefaultParam = (param) => {
    let value;
    let json;
    let onNull = false;
    if (param && typeof param === 'object') {
        value = param.value;
        json = param.json;
        onNull = !!param.onNull;
    }
    else {
        value = param;
    }
    if (typeof json === 'string') {
        if (onNull) {
            return (v) => (v == null ? JSON.parse(json) : v);
        }
        return (v) => (v === undefined ? JSON.parse(json) : v);
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
};
export const defaultDef = {
    sanitizer: compileDefaultParam,
    runOnNil: true,
};
//# sourceMappingURL=default.js.map