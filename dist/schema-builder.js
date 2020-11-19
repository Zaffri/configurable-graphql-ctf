module.exports = {
    stitchResolvers: (allResolvers) => {
        if (!allResolvers || !Array.isArray(allResolvers))
            return {};
        const combinedResolvers = { Query: {} };
        allResolvers.forEach((resolver) => {
            for (prop in resolver) {
                if (combinedResolvers[prop]) {
                    // Prop Exists - merge
                    const newPropValue = Object.assign(Object.assign({}, combinedResolvers[prop]), resolver[prop]);
                    combinedResolvers[prop] = newPropValue;
                }
                else {
                    // Does not exist - add new prop
                    combinedResolvers[prop] = resolver[prop];
                }
            }
        });
        return combinedResolvers;
    }
};
//# sourceMappingURL=schema-builder.js.map