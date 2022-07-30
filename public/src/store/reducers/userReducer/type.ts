import { IUser } from "../../../types/user.interface"

export enum TypeUserAction {
    CHECK = "CHECK",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

interface IActionCheck {
    type: TypeUserAction.CHECK
}

interface IActionLogin {
    type: TypeUserAction.LOGIN
    payload: IUser
}

interface IActionLogout {
    type: TypeUserAction.LOGOUT
}

export type ActionUser = IActionCheck | IActionLogin | IActionLogout


export interface IStateUser {
    infoUser: null | IUser
    isCheck: boolean
}