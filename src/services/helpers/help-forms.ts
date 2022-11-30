// Helpers functions to be used in form views
//
// ===========================================================
import type { ICertificatesRow, IMultiselectBasic, IRol, ICertificateDto } from '@/services/definitions'
import type { ICertStatus } from '../definitions/entities/types-certificates'


/**
 * Maps the roles data format coming from Roles Nomenclator
 */
export function mapRolesNom2Multiselect( roleNomeData: Array<IRol> ): Array<IMultiselectBasic> {

    return roleNomeData.map((roleData: IRol) => {
        return { value: roleData.label, label: roleData.name }
    })
}

/**
 * Maps the certificates status data format
 */
export function mapCertStatus2Multiselect( roleNomeData: Array<ICertStatus> ): Array<IMultiselectBasic> {

    return roleNomeData.map((statusData: ICertStatus) => {
        return { value: statusData.value, label: statusData.name }
    })
}

export function transformCertificateResponse (records:any): Array<ICertificatesRow> {
    let certificatesRow: Array<ICertificatesRow> = [] as ICertificatesRow[]
    records.forEach((record: { ID: any; docType: any; certification: any; emitter: any; accredited: any; secretary_validating: any; dean_validating: any; rector_validating: any; date: any; created_by: any; volume_folio_faculty: any; volume_folio_university: any; certificate_status: any; gold_certificate: any; invalid_reason: any}) => {
        certificatesRow.push(
            {
                id: record.ID,
                docType: record.docType,
                certification:record.certification,
                gold_certificate:record.gold_certificate,
                emitter:record.emitter,
                accredited:record.accredited,
                secretary_validating:record.secretary_validating,
                dean_validating:record.dean_validating,
                rector_validating:record.rector_validating,
                date:record.date,
                created_by:record.created_by,
                volume_folio_faculty:record.volume_folio_faculty,
                volume_folio_university:record.volume_folio_university,
                certificate_status: record.certificate_status,
                invalid_reason: record.invalid_reason
                
            }
        )
       });

    return certificatesRow
}

export function transformCertificateForm (record:ICertificateDto): any {
    const certificate: any = 
            {
                ID: record.id,
                docType: record.docType,
                certification:record.certification,
                gold_certificate:record.gold_certificate,
                emitter:record.emitter,
                accredited:record.accredited,
                secretary_validating:record.secretary_validating,
                dean_validating:record.dean_validating,
                rector_validating:record.rector_validating,
                date:record.date,
                created_by:record.created_by,
                volume_folio_faculty:record.volume_folio_faculty,
                volume_folio_university:record.volume_folio_university,
                certificate_status: record.certificate_status,
                invalid_reason: record.invalid_reason
            }

    return certificate
}

