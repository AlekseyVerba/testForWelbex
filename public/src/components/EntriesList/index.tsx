import React, { useEffect, useState } from "react"
import { useActions } from "../../hooks/useActions"
import { useHttp } from "../../hooks/useHTTP"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { IResponseSuccess } from "../../types/responses/index.interface"
import { IEntry } from "../../types/entry.interface"
import { RequestGetEnum } from "../../reguestEnums/"
import EntriesList from "./EntriesList"


const EntriesListWrapper: React.FC = () => {

    const { ActionClearEntries, ActionChangeMore, ActionGetAllEntries } = useActions()
    const { entry: { items, isMore } } = useTypedSelector(state => state)
    const [currentOffset, setCurrentOffset] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const { request } = useHttp<IResponseSuccess<IEntry[]>>()

    const getItems = async () => {
        const { data } = await request(`${RequestGetEnum.ENTRIES}?offset=${currentOffset}`, "GET", null)

        if (data?.length === 0) {
            ActionChangeMore(false)
        } 

        ActionGetAllEntries(data!)

        setLoading(false)
    }

    useEffect(() => {
        ActionClearEntries()
        setLoading(true)
        getNewItems()
        return function clearItems() {
            ActionClearEntries()
            setCurrentOffset(10)
        }
    }, [])

    const getNewItems = async () => {
        getItems()
        setCurrentOffset(currentOffset + 10)
    }

    return <EntriesList getNewItems={getNewItems} 
                        isMore={isMore} 
                        items={items} 
                        loading={loading}                  
            />
   
}

export default EntriesListWrapper