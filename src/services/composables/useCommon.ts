/* COMMON FUNCTIONS */

export default function useCommon () {
    
    /***
     * Capitalize the first letter of a string
     */
    const cap = (str: string): string => { return str.charAt(0).toUpperCase() + str.substring(1) }
    
    return {
        cap,
    }
}
