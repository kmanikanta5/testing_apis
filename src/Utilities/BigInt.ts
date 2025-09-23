export function convertBigInt(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(convertBigInt);
    } else if (obj !== null && typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            const value = obj[key];
            if (typeof value === "bigint") {
                newObj[key] = value.toString(); 
            } else {
                newObj[key] = convertBigInt(value);
            }
        }
        return newObj;
    }
    return obj;
}
