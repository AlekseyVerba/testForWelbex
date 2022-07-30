export interface IUser {
    id: number
    name: string
}

export interface IUserWithToken {
    user: IUser
    token: string
}