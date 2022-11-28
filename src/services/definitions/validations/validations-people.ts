import { i18n } from '@/services/i18n'
import { regex, required } from '@vee-validate/rules'
import { regStrongPassword, VSchemaCommon } from '@/services/definitions/validations/validations-commons'

const { t } = i18n.global

/**
 * Staff validation schema. Prepare to be used with Vee-validate lib when creating a new Staff
 * The 'creating' part is important, 'cause when the form is on creation mode, the pass an confirmations field should
 * be required as we are creating a new Staff, so we need a password
 */
export const VSchemaStaffCreate = {
    firstName: VSchemaCommon.firstName,
    lastName:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    cell:      VSchemaCommon.cell,
    email:     VSchemaCommon.email,
    password:  ( value: string ): boolean | string => {
        if (!required(value)) return t('validation.required')
        if (!regex(value, { regex: regStrongPassword })) return t('validation.password-complexity')
        return true
    },
    passwordConf: ( value: string, validationInstance: any ): boolean | string => {
        if (!required(value)) return t('validation.required')

        // The second parameter vee-validate pass to the validation function is a sort of validation object instance containing the entire form
        // The thing with the firs check, if for not showing any error in 'passwordConf' field  when 'password' field is empty

        if (validationInstance.form.password === undefined || validationInstance.form.password === '') return true
        if (validationInstance.form.password !== value) return t('validation.password-confirmation')                // We could use vee-validate 's 'confirmed' rule here, but it isn't working for some reason
        return true
    }
    // avatarPath: VSchemaCommon.avatarPath,
    // roleId: ???
}

export const VSchemaStaffEdit = {
    firstName: VSchemaCommon.firstName,
    lastName:  VSchemaCommon.lastName,
    username:  VSchemaCommon.username,
    cell:      VSchemaCommon.cell,
    email:     VSchemaCommon.email,
    password:  ( value: string ): boolean | string => {
        if (!regex(value, { regex: regStrongPassword })) return t('validation.password-complexity')
        return true
    },
    passwordConf: ( value: string, validationInstance: any ): boolean | string => {

        // The second parameter vee-validate pass to the validation function is a sort of validation object instance containing the entire form
        // The thing with the firs check, if for not showing any error in 'passwordConf' field  when 'password' field is empty

        if (validationInstance.form.password === undefined || validationInstance.form.password === '') return true
        if (validationInstance.form.password !== value) return t('validation.password-confirmation')                // We could use vee-validate 's 'confirmed' rule here, but it isn't working for some reason
        return true
    }
}