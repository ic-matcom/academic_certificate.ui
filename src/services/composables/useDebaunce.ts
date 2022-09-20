import type { Function1 } from '@/services/definitions'


/***
 * Callback a function after specific(default) timeout of an event trigger
 * Eg. this could be use in a input for trigger a event when a amount of time has passed
 *
 * @param callback Function to call back when timeout complete
 * @param timeoutCount Number of milliseconds to wait for
 * @param minLength Ming length of text(value) for check out to callback the function
 */
export default function(callback: Function1<string>, timeoutCount = 650, minLength = 4) {
    let timeoutRef: number = 0

    const debounceListener = (evt: any) => {
        if (timeoutRef !== 0) clearTimeout(timeoutRef)

        timeoutRef = setTimeout(() => {
            if (evt.target.value.length >= minLength || evt.target.value.length === 0) callback(evt.target.value)
        }, timeoutCount)
    }

    return { debounceListener }
}
