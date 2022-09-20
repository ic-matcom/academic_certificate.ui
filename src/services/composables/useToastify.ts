import { POSITION } from 'vue-toastification'
import type { PluginOptions, ToastInterface } from 'vue-toastification'
import type { OPSKind } from '@/services/definitions'
import { useErrors } from '@/services/helpers/errors-helpers'


export default function useToastify( toast: ToastInterface ) {
    const { makeErrorString } = useErrors()

    function _mkError( msg: string, position = POSITION.TOP_RIGHT ) {
        toast.error(msg, {
            timeout: 5000,
            position: position,
            showCloseButtonOnHover: true,
            pauseOnFocusLoss: true,
            icon: 'tim-icons icon-alert-circle-exc'
        })
    }

    /**
     * Create an operation equivalent string, to be concatenated later and it can be uses as part of
     * the final msg UI/UX feedback message.
     *
     * @param ops Type / Kind of the operation
     * @param isPresentTense if tense is current time, then present tense will be used, otherwise gerund tense will be used.
     */
    function _getOpsKind( ops: OPSKind, isPresentTense: boolean = false ): string {
        let opsKind = '[unknown]'

        if (ops === 'deletion') opsKind = isPresentTense ? 'crud-actions.deletion-gerund' : 'crud-actions.deletion-pas'
        else if (ops === 'addition') opsKind = isPresentTense ? 'crud-actions.addition-gerund' : 'crud-actions.addition-pas'
        else if (ops === 'enable') opsKind = isPresentTense ? 'crud-actions.enable-gerund' : 'crud-actions.enable-pas'
        else if (ops === 'disable') opsKind = isPresentTense ? 'crud-actions.disable-gerund' : 'crud-actions.disable-pas'
        else if (ops === 'update') opsKind = isPresentTense ? 'crud-actions.update-gerund' : 'crud-actions.update-pas'
        else if (ops === 'request') opsKind = isPresentTense ? 'crud-actions.request-gerund' : 'crud-actions.request-pas'

        return opsKind
    }

    function _getDetails( error: any, subject: string = '', subjectName: string = '', isBulk: boolean = false ): string {

        if (error === undefined) {
            console.error('Error object is undefined')
            return ''
        }

        let details = error.response.data.title
        const eCode = error.response.status

        if (eCode === 404)
            details = isBulk
                ? `'toasts.e404' | subject: ${subject}`
                : `'toasts.e404-single' | subject: ${subject} | name: ${subjectName}`
        else if (eCode === 400) details = makeErrorString(error.response.data)

        return details
    }

    /***
     * Very basic of toast example with a fixed position in the TopRight screen area,
     * and an exposure time of 3 seconds.
     * @param msg the message to show
     */
    const tfyPrimary = ( msg: string ): void => {

        // tfy is stand for toastify
        toast(msg, {
            timeout: 3000,
            position: POSITION.TOP_RIGHT,
            showCloseButtonOnHover: true,
            pauseOnFocusLoss: true,
            icon: 'tim-icons icon-bell-55'
        } as PluginOptions)
    }

    /***
     * Generic fail toastify with a custom message. Usefull for validation
     * errors or other type of error during data manipulation
     */
    const tfyError = ( msg: string ): void => {
        _mkError(msg)
    }

    /***
     * Cast a toast for a successfully operation / request
     *
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicSuccess = ( subject: string, ops: OPSKind, name: undefined | string = undefined ): void => {

        let kind = _getOpsKind(ops)

        toast.success(
            `toasts.ops-ok 
                subject: ${subject},
                name: ${name !== undefined && typeof name === 'string' ? name : ''},
                opsKind:${kind}`),
            {
                timeout: 4000,
                position: POSITION.TOP_RIGHT,
                showCloseButtonOnHover: true,
                pauseOnFocusLoss: true,
                icon: 'tim-icons icon-check-2'
            } as PluginOptions
    }

    /***
     * Cast a toast for a generic warning message
     *
     * @param msg Message to shown
     */
    const tfyBasicWarning = ( msg: string ): void => {

        toast.warning(msg, {
            timeout:  4000,
            position: POSITION.TOP_RIGHT,
            showCloseButtonOnHover: true,
            pauseOnFocusLoss: true,
            icon:     'tim-icons icon-alert-circle-exc'
        } as PluginOptions)
    }

    /***
     * Cast a toast for a fail api operation / request
     *
     * @param error XHR HTTP Error object
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicFail = ( error: any, subject: string, ops: OPSKind, name: undefined | string = undefined ): void => {

        let kind = _getOpsKind(ops, true)
        let subjectName = name !== undefined && typeof name === 'string' ? name : ''

        // internal backend error with no return
        if (!error.response) {
            _mkError(`'toasts.ops-fail',  subject: ${subject}, opsKind: ${kind}`)
            return
        }

        // backend error return with details
        let details = _getDetails(error, subject, subjectName)
        _mkError(
            `'toasts.ops-fail-details',
                subject: ${subject},
                opsKind: ${kind},
                name: ${subjectName},
                status: ${error.response.status},
                details: ${details}`
        )
    }

    const tfyAuthFail = ( error: any ): void => {
        const eCode = error.response !== undefined ? error.response.status : undefined
        let details

        if (eCode === 401 || eCode === 404) details = 'toasts.auth-fail-4xx'
        else details = 'toasts.auth-fail-unknown'

        _mkError(details, POSITION.TOP_CENTER)
    }

    return {
        tfyPrimary,
        tfyAuthFail,
        tfyBasicFail,
        tfyBasicSuccess,
        tfyBasicWarning,
        tfyError
    }
}
