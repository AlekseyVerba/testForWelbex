import React from "react"
import { IEntry } from "../../types/entry.interface"
import Image from "../Image"
import Video from "../Video"
import { isImage } from "../../utils"
import "./index.scss"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import EntryBottom from "./EntryBottom"

interface IProps {
    item: IEntry
}

const Entry: React.FC<IProps> = ({ item: { createdAt, files, id, message, user } }) => {

    const { infoUser: currentUser } = useTypedSelector(state => state.user)

    const dateTostring = createdAt.toString()
    const filesComponents = files.map(value => {
        if (isImage(value)) return <Image url={value}/>
        return <Video url={value} />
    })

    return (
        <div className="card border-secondary mb-3">
            <div className="card-header">
                <div>{user.name}</div>
                <div>{dateTostring}</div>
            </div>
            <div className="card-body">
                <p className="card-text">{message}</p>
                <div>
                    {filesComponents}
                </div>
                {
                    currentUser?.id === user.id && <EntryBottom entryID={id} />
                }
            </div>
        </div>
    )
}

export default Entry