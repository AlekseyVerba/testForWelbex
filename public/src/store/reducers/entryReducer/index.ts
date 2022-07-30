import { ActionEntry, IStateEntry, TypeEntryAction } from "./type"

const defaultState: IStateEntry = {
    items: [],
    isMore: true,
    editEntry: null
}

export const entryReducer = (state = defaultState, action: ActionEntry): IStateEntry => {

    switch(action.type) {

        case TypeEntryAction.ADD_ENTRY: {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        }

        case TypeEntryAction.GET_ALL_ENTRIES: {
            return {
                ...state,
                items: [...state.items, ...action.payload]
            }
        }

        case TypeEntryAction.CLEAR_ENTRIES: {
            return {
                ...state,
                items: [],
                isMore: true
            }
        }

        case TypeEntryAction.REMOVE_ENTRY: {
            const id = action.payload
            return {
                ...state,
                items: state.items.filter(item => item.id !== id)
            }
        }

        case TypeEntryAction.CHANGE_MORE: {
            return {
                ...state,
                isMore: action.payload
            }
        }

        case TypeEntryAction.ADD_EDIT_ENTRY: {
            return {
                ...state,
                editEntry: action.payload
            }
        }

        case TypeEntryAction.REMOVE_PHOTO_ENTRY: {
            return {
                ...state,
                editEntry: {...state.editEntry!, files: state.editEntry!.files.filter(file => file !== action.payload.url)}
            }
        }

        // case TypeEntryAction.UPDATE_ENTRY: {
        //     const 
        // }

        default: {
            return state
        }
    }

}