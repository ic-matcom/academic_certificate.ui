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