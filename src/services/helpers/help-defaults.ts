import type { IDataTableQuery, IScrollInfo } from "@/services/definitions"


export function makeDefaultMenuQuery( pLimit = Number.MAX_VALUE ): IDataTableQuery {
    return {
        Orderer: 'id',
        Offset : 0,
        Limit  : pLimit
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
