import { i18n } from '@/services/i18n'
//@ts-ignore               this is 'cause we are customizing the sweetalert2 scss, we don't need de original styles files
import Swal from 'sweetalert2/dist/sweetalert2.min.js'

import type { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import type { TActionKind, EntityGenericNames } from '@/services/definitions'
import type { Function1 } from '@/services/definitions'


const { t } = i18n.global

export default function useDialogfy() {

    // Another alternative for using vue i18n ❗inside a setup
    // const { t } = useI18n({ useScope: 'global' })
    // import { useI18n } from 'vue-i18n'
    // see more here https://github.com/kazupon/vue-i18n/issues/276 | https://stackoverflow.com/questions/57049471/problem-to-use-vuei18n-outside-a-component | https://stackoverflow.com/questions/48238906/vue-project-tests-are-failing-when-i-added-vue-i18n-karma-mocha-phantomjs | https://stackoverflow.com/questions/57049471/problem-to-use-vuei18n-outside-a-component  |https://github.com/intlify/vue-i18n-next/tree/master/examples/composition

    /***
     * Basic dialog for a simple message.
     * @param txt The text for the dialog
     */
    const dfyBasicOKBtn = ( txt: string ): void => {
        Swal.fire({
            titleText:        txt,
            showDenyButton:   true,
            showCancelButton: true
        } as SweetAlertOptions)
    }

    /***
     * Dialog for confirm a deletion, showing the confirm and decline buttons.
     * @param subject Subject or type of entity of the deletion operation.
     * @param target Target to be deleted.
     * @param callback Function callback to be call if the dialog was confirm
     * @param name Object/Entity name to be deleted
     * @Deprecated Just a sample method. Don't use it.
     */
    const dfyDeleteConfirmations = (
        subject: string,
        target: string,
        callback: Function1<string>,
        name: undefined | string = undefined
    ): void => {
        let text = 'Are you sure you want to delete this catalog ?'

        if (name !== undefined && typeof name === 'string')
            text = `Are you sure you want to the delete the ${ name } catalog ?`

        Swal.fire({
            icon          : 'warning',
            titleText     : `${ subject } Deletion`,
            text          : text,
            showDenyButton: true
        } as SweetAlertOptions).then(( result: SweetAlertResult ) => {
            if (result.isConfirmed) callback(target)
        })
    }

    /**
     * Create a dialog from which to confirm an action
     * over the given target
     * @param action Kind of action to confirm. Eg. create, delete
     * @param subject Subject entity of the action
     * @param isBulk Tells if the call is for a plural subject (more than one). Eg. in bulk actions
     * @returns true if ok clicked, false otherwise
     */
    async function dialogfyConfirmation( action: TActionKind, subject: EntityGenericNames, isBulk = false ): Promise<boolean> {
        let result: SweetAlertResult = await Swal.fire({
            icon:           'warning',
            titleText:      t('dialogs.confirm'),
            text:           t('dialogs.confirmation', {
                action:  t(`crud-actions.${ action }`),
                plural:  isBulk ? t('others.this-ones') : '',                           // just for spanish by now
                subject: t(`entities.${ subject }.name`)
            }),
            showDenyButton: true
        })

        return result.isConfirmed
    }

    return {

        dfyBasicOKBtn,
        dfyDeleteConfirmations,
        dialogfyConfirmation

    }
}