import React from "react"
import EntryBottom from "./EntryBottom"
import { useHttp } from "../../../hooks/useHTTP"
import { IResponse } from "../../../types/responses/index.interface"
import { RequestDeleteEnum } from "../../../reguestEnums/"
import { useActions } from "../../../hooks/useActions"

interface IProp {
    entryID: number
}

const EntryBottomWrapper: React.FC<IProp> = ({ entryID }) => {

    const { loading: loadingDelete, request } = useHttp<IResponse>()
    const { ActionRemoveEntry } = useActions()

    const deleteEntry = async (): Promise<void> => {
        const { status, message } = await request(`${RequestDeleteEnum.DELETE_ENTRY}/${entryID}`, "DELETE", null)

        if (status) {
            ActionRemoveEntry(entryID)
        } else {
            alert(message)
        }

    }

    return <EntryBottom id={entryID} loadingDelete={loadingDelete} deleteEntry={deleteEntry} />
}

export default EntryBottomWrapper