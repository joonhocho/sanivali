export const defaultDefs = {};
export const addDef = (name, def) => {
    if (name in defaultDefs) {
        throw new Error(`${name} definition already exists`);
    }
    defaultDefs[name] = def;
};
//# sourceMappingURL=defaultDefs.js.map