import { IEntry } from "../../../types/entry.interface"

export enum TypeEntryAction {
    GET_ALL_ENTRIES = "GET_ALL_ENTRIES",
    ADD_ENTRY = "ADD_ENTRY",
    REMOVE_ENTRY = "REMOVE_ENTRY",
    UPDATE_ENTRY = "UPDATE_ENTRY",
    CLEAR_ENTRIES = "CLEAR_ENTRIES",
    CHANGE_MORE = "CHANGE_MORE",
    ADD_EDIT_ENTRY = "ADD_EDIT_ENTRY",
    REMOVE_PHOTO_ENTRY = "REMOVE_PHOTO_ENTRY"
}

interface IGetAllEntries {
    type: TypeEntryAction.GET_ALL_ENTRIES
    payload: IEntry[]
}

interface IAddEntry {
    type: TypeEntryAction.ADD_ENTRY
    payload: IEntry
}

interface IRemoveEntry {
    type: TypeEntryAction.REMOVE_ENTRY
    payload: number
}

interface IUpdateEntry {
    type: TypeEntryAction.UPDATE_ENTRY
    payload: {
        id: number
        entry: IEntry
    }
}

interface IChangeMore {
    type: TypeEntryAction.CHANGE_MORE
    payload: boolean
}

interface IClearEntries {
    type: TypeEntryAction.CLEAR_ENTRIES
}

interface IAddEditEntry {
    type: TypeEntryAction.ADD_EDIT_ENTRY
    payload: IEntry | null
}

interface IRemovePhotoEntry {
    type: TypeEntryAction.REMOVE_PHOTO_ENTRY
    payload: {
        id: number
        url: string
    }
}

export type ActionEntry = IGetAllEntries | IAddEntry | IRemoveEntry 
                        | IUpdateEntry | IClearEntries | IChangeMore
                        | IAddEditEntry | IRemovePhotoEntry

export interface IStateEntry {
    items: IEntry[]
    editEntry: IEntry | null
    isMore: boolean
}