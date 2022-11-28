import AllRules from '@vee-validate/rules'
import { defineRule } from 'vee-validate'


/***
 * If the value is required
 *
 * @param val Value to check
 */
export const vRequired = ( val: any ) => {
    if (typeof val === 'string') {
        return val.trim() !== ''
    }

    return val !== undefined
}

/***
 * Return if the value has minimum length (default 3).
 *
 * @param val Value to check
 * @param length Length to compare to.
 */
export const vLengthMin = ( val: any, length = 3 ) => {
    return val.length >= length
}

export function vEmail( value: string ) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}

export function vMatch( value: string, regex: RegExp ) {
    return regex.test(value)
}

/**
 * Register this module's rules as globals to be used
 * application wide using vee-validate syntax.
 * This should be called on main.ts
 */
export function useGlobalRules() {
    // Export global rules in vee-validate.
    // Check https://vee-validate.logaretm.com/v4/guide/global-validators
    // for full list of them
    Object.keys(AllRules).forEach(rule => {
        defineRule(rule, AllRules[ rule ])
    })

    // Add custom rules here
    /**
     * Geo-position rule
     */
    // defineRule('geo', (value:any) => {
    //     if (typeof value === 'string') {
    //         return /^[-]{0,1}(\d){1,3}.(\d){2,12}$/i.test(value);
    //     }

    //     return false
    // })
}