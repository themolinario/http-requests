function isEqual (arg1: unknown, arg2: unknown): boolean {
    const type1: string = typeof arg1;
    const type2: string = typeof arg2;

    console.log(type1);

    if (type1 !== type2){
        return false;
    }

    if (type1 === 'string' || type1 === 'number' || type1 === 'symbol' || type1 === 'function' || type1 === 'undefined'){
        return arg1 === arg2;
    }

    const isArray = Array.isArray(arg1);

    if (isArray){
        const array1 = arg1 as Array<unknown>;
        const array2 = arg2 as Array<unknown>;

        if (array1.length !== array2.length) return false;

        for (let i = 0; i < array1.length; i++){
            if (!isEqual(array1[i], array2[i])){
                return false
            }
        }

        return true;
    }

        const object1 = arg1 as object;
        const object2 = arg2 as object;

        if (object1 === null || object2 === null){
            return object1 === object2;
        }

        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (!isEqual(keys1, keys2)) return false;
        return (isEqual(Object.values(object1), Object.values(object2)));
}

const a = [1,2,3];
const b = [1,2,3,4];

console.log(isEqual(a, b));

