import { ActionUser, IStateUser, TypeUserAction } from "./type"

const stateDefault: IStateUser = {
    isCheck: false,
    infoUser: null
}

export const userReducer = (state = stateDefault, action: ActionUser): IStateUser => {

    switch(action.type) {

        case TypeUserAction.CHECK: {
            return {
                ...state,
                isCheck: true
            }
        }

        case TypeUserAction.LOGIN: {
            return {
                ...state,
                infoUser: action.payload
            }
        }

        case TypeUserAction.LOGOUT: {
            return {
                ...state,
                infoUser: null
            }
        }

        default: {
            return state
        }
    }

}