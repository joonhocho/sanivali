export const isSanivali = (x) => x ? x.isSanivali === true : false;
export const isEmptyObject = (x) => {
    if (typeof x === 'object') {
        for (const k in x) {
            if (x.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
    return false;
};
const { floor } = Math;
export const isInteger = Number.isInteger || ((v) => isFinite(v) && floor(v) === v);
export const isEmpty = (v) => v == null || v === '' || isEmptyObject(v);
export const nilTests = {
    undefined: (x) => x === undefined,
    null: (x) => x === null,
    nil: (x) => x == null,
    falsy: (x) => !x,
    empty: isEmpty,
};
export const notNilTests = {
    undefined: (x) => x !== undefined,
    null: (x) => x !== null,
    nil: (x) => x != null,
    falsy: (x) => !!x,
    empty: (x) => !isEmpty(x),
};
//# sourceMappingURL=util.js.map