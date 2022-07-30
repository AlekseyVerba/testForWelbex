import { ActionEntry, TypeEntryAction } from "../reducers/entryReducer/type"
import { IEntry } from "../../types/entry.interface"

// export const ActionAddEntry = (payload: IEntry):ActionEntry => {
//     return {
//         type: TypeEntryAction.ADD_ENTRY,
//         payload
//     }
// }

export const ActionGetAllEntries = (payload: IEntry[]): ActionEntry => {
    return {
        type: TypeEntryAction.GET_ALL_ENTRIES,
        payload
    }
}

export const ActionClearEntries = ():ActionEntry => {
    return {
        type: TypeEntryAction.CLEAR_ENTRIES,
    }
}

export const ActionChangeMore = (payload: boolean):ActionEntry => {
    return {
        type: TypeEntryAction.CHANGE_MORE,
        payload
    }
}

export const ActionRemoveEntry = (payload: number): ActionEntry => {
    return {
        type: TypeEntryAction.REMOVE_ENTRY,
        payload
    }   
}

export const ActionAddEditEntry = (payload: IEntry | null): ActionEntry => {
    return {
        type: TypeEntryAction.ADD_EDIT_ENTRY,
        payload
    }
}

export const ActionRemoveFileEntry = (payload: {id: number, url: string}): ActionEntry => {
    return {
        type: TypeEntryAction.REMOVE_PHOTO_ENTRY,
        payload
    }
}