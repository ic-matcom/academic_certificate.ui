import type { ICertStatus } from "./entities/types-certificates"

export enum HTTP_RESPONSES {
    OK = 200,
    BAD_REQ = 400,
    INTERNAL_SERVER_ERROR = 500
}

export const Chaincode = {
    channel:   "mychannel",
    chaincode: "certificate",
    signer:    "User1"
}

export const Cert_Status: Array<ICertStatus> = [ 
    {name: "Invalid", value: 0}, 
    {name: "Created", value: 1},
    {name: "SignedBySecretary", value: 2}, 
    {name: "SignedByDean", value: 3}, 
    {name: "Valid", value: 4} 
]

export enum SearchTypes {
    Status = 0,
    Accredited = 1,
    ID = 2,
    ToValidate = 3
}
