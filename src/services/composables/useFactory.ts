import type { ICertificateDto, IStaffDto } from '@/services/definitions'


export default function useFactory() {

    //#region ======= FACTORY METHODS =====================================================

    const mkStaff = (): IStaffDto => {
        return {
            id: 0,
            firstName: '',
            username: '',
            roleId: 0,
            isActive: true,
            cell: 0,
            avatarPath: '',
            lastName: '',
            email: '',
            locale: '',
            password: '',
            passwordConf: '',
        }
    }

    const mkCertificate = (): ICertificateDto => {
        return {
            docType:                    '',
            id:                         '',
            certification:              '',
            gold_certificate:           false,
            emitter:                    '',
            accredited:                 '',
            date:                       '',
            created_by:                 '',
            secretary_validating:       '',
            dean_validating:            '',
            rector_validating:          '',
            volume_folio_faculty:       '',
            volume_folio_university:    '',
            certificate_status:         0
        }
    }

    //#endregion ==========================================================================

    return {
        mkStaff,
        mkCertificate
    }
}

