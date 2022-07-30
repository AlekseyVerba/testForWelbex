import { ActionUser, TypeUserAction } from "../reducers/userReducer/type"
import { IUser } from "../../types/user.interface"

export const ActionCheck = (): ActionUser => {
    return {
        type: TypeUserAction.CHECK
    }
}

export const ActionLogin = (payload: IUser): ActionUser => {
    return {
        type: TypeUserAction.LOGIN,
        payload
    }
}

export const ActionLogout = (): ActionUser => {
    return {
        type: TypeUserAction.LOGOUT
    }
}