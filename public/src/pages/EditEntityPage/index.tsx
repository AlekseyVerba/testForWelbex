import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FormCreateEntry from "../../components/FormCreateEntry"
import { IEntry } from "../../types/entry.interface"
import BigLoader from "../../components/BigLoader"
import { useHttp } from "../../hooks/useHTTP"
import { RequestGetEnum } from "../../reguestEnums/"
import { IResponseSuccess, IResponseFail } from "../../types/responses/index.interface"
import { useTypedSelector } from "hooks/useTypedSelector"
import DeleteFiles from "../../components/DeleteFiles"
import { useActions } from "../../hooks/useActions"
import "./index.scss"


const EditEntityPage = () => {

    const { id } = useParams()
    const { request, loading } = useHttp<IResponseSuccess<IEntry> | IResponseFail>()
    const { ActionAddEditEntry } = useActions()
    const [error, setError] = useState<string | null>(null)
    const { user: {infoUser}, entry: {editEntry: entry} } = useTypedSelector(state => state)

    useEffect(() => {

        const start = async () => {
            const res = await request(`${RequestGetEnum.ENTRY}/${id}`, "GET", null)

            if (res.status) {
                ActionAddEditEntry(res.data!)
            } else {
                setError(res.message)
            }

        }

        start()

        return () => {
            ActionAddEditEntry(null)
            setError(null)
        }
    }, [id])

    if (loading) return (
        <div className="check">
            <div className="check__wrapper">
                <BigLoader />
            </div>
        </div>
    )

    if (error) return (
        <div>
            <h1 style={{ textAlign: "center" }}>{error}</h1>
            <Link to="/">Перейти к постам</Link>
        </div>
    )

    if (entry?.user.id !== infoUser?.id) return (
        <div>
            <h1 style={{ textAlign: "center" }}>У вас нету прав</h1>
            <Link to="/">Перейти к постам</Link>
        </div>
    )

    return (
        <div className="create-entity-page">
            <h1>Редактирование поста</h1>
            <DeleteFiles files={entry?.files!} id={entry?.id!} />
            <FormCreateEntry />
            <Link to="/">Перейти к постам</Link>
        </div>
    )
}

export default EditEntityPage