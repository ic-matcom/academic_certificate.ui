import { vLengthMin, vRequired } from '@/services/validations/rules'


//region ======== SCHEMA ================================================================
export const VSCHEMA = {
   //user: vUserName,
   //password: vPassword
}
//endregion =============================================================================


//region ======== VALIDATIONS FUNCTIONS =================================================
 function vUserName (val:any, field: string) : boolean | string {
    
     if (!vRequired(val)) return `The ${field} is required`
     if (!vLengthMin(val)) return `The ${field} is invalid`
    
     return true
 }

 function vPassword (val:any, field: string) : boolean | string {
    
     if (!vRequired(val)) return `The ${field} is required`
     if (!vLengthMin(val)) return `The ${field} is invalid`
    
     return true
 }
//endregion =============================================================================
