import { combineReducers } from "redux"
import { userReducer } from "./userReducer/"
import { entryReducer } from "./entryReducer"

export const rootReducer = combineReducers({
    user: userReducer,
    entry: entryReducer
})

export type RootState = ReturnType<typeof rootReducer>