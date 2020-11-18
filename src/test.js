// Dynamic resolver stitching test

const r1 = {
    Query: {
        getUsersBySurname: (obj, args, context) => {
            return [];
        } 
    }
}

const r2 = {
    Query: {
        getUsersByEmail: (obj, args, context) => {
            return [];
        } 
    }
}

const r3 = {
    Query: {
        getUserById: (obj, args, context) => {
            return '';
        }
    },
    Project: {
        test: () => {},
        test2: () => {}
    }
}

const r4 = {
    Query: {},
    Project: {
        test3: () => {}
    }
}

const r5 = {
    Team: {
        t1: () => {}
    }
}


const combinedResolvers = {
    Query: {}
}

const allResolvers = [r1, r2, r3, r4, r5]

allResolvers.forEach((resolver) => {
    for(prop in resolver) {
        if(combinedResolvers[prop]) {
            // Prop Exists - merge
            const newPropValue = { ...combinedResolvers[prop], ...resolver[prop] }
            combinedResolvers[prop] = newPropValue
        } else {
            // Does not exist - add new prop
            combinedResolvers[prop] = resolver[prop]
        }
    }
})

console.log("..........")
console.log(combinedResolvers)