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
//# sourceMappingURL=util.js.map