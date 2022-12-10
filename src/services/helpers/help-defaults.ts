import type { IDataTableQuery, IScrollInfo } from '@/services/definitions'


export function makeDefaultMenuQuery( pLimit = Number.MAX_VALUE ): IDataTableQuery {
    return {
        Orderer: 'id',
        Offset : 0,
        Limit  : pLimit,
        nextPage: '',
    }
}

/***
 * Is used in the second case of the back to top functionality
 */
export function handleScroll( e: any ): IScrollInfo {
    let scrollTop = e.target.scrollTop
    let offsetTop = e.target.offsetTop
    return { scrollTop, offsetTop }
}

/**
 * Check if the given parameter is an empty object
 * @param obj object param to check
 */
export function IsEmptyObj( obj: any ) {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
}

export function isNumber( n: any ) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }