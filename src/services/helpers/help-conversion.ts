import type { ById, IIndexable, IShell } from "@/services/definitions";

/***
 * Convert a dictionary mapped by Id to an array of the collection objects
 * @param collection The collection of object mapped by the Ids
 */
export function toArray<T>(collection: ById<T>): T[] {
    return Object.keys(collection).reduce<T[]>((pv, cv) => {
        pv.push(collection[+cv]);
        return pv;
    }, []);
}

/***
 * Convert the collection params array to a dictionary mapped by objects ID
 * @param collection Data collection
 */
export function toDicIds<T extends IIndexable>(collection: T[]): ById<T> {
    return collection.reduce<ById<T>>((pv, cv) => {
        pv[cv.id] = cv;
        return pv;
    }, {});
}

/***
 * This methods encapsulate the collection in a object of two properties: array and dictionary
 * @param items Array of source object data
 * @return IShell object
 */
export function toShell<T extends IIndexable>(items: Array<T>): IShell<T> {
    const dictionary = toDicIds(items);

    return {
        array: toArray(dictionary),
        dic: dictionary,
    };
}

/**
 * Utility function when partially copying an object is required.
 * @param target Target object to update
 * @param source source object to copy from
 */
export function copyTo<T, K extends T>(target: T, source: K) {
    Object.keys(source)
        .filter(key => Object.keys(target).includes(key))
        .forEach(key => {
            if (source[key as keyof K]) {
                target[key as keyof T] = source[key as keyof K] as any;
            }
        });
}
