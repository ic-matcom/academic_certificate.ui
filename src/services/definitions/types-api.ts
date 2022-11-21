export interface IAuthResponse {
    access_token: string
}

export interface IAuthProfileResponse {
    id:        number,
    username:  string,
    firstname: string,
    lastname:  string,
    email:     string
}

export type IUserResponseData = {
    id:         number
    email:      string
    firstname:  string
    lastname:   string
    username:   string
}
