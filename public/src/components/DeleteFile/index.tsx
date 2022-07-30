import React from "react";
import Image from "../Image"
import Button from "../Button"
import { isImage } from "../../utils/"
import Video from "../Video"
import { TypeButton } from "../../types/button.interface"
import { useHttp } from "../../hooks/useHTTP"
import { IResponse } from "../../types/responses/index.interface"
import { RequestDeleteEnum } from "../../reguestEnums/"
import { useActions } from "../../hooks/useActions"
import "./index.scss"

interface IProp {
    id: number
    url: string
}

const DeleteFile: React.FC<IProp> = ({ id, url }) => {

    const file = isImage(url) ? <Image url={url} /> : <Video url={url} />
    const { ActionRemoveFileEntry } = useActions()
    const { loading, request } = useHttp<IResponse>()

    const deleteFile = async () => {
        const { status, message } = await request(`${RequestDeleteEnum.DELETE_FILE}/${id}`, "DELETE", {path: url})
            ActionRemoveFileEntry({id, url})
        if (status) {

        } else {
            alert(message)
        }
    }

    return (
        <div className="delete-file">
            <div>
                {file}
            </div>
            <Button text="Удалить" event={deleteFile} loading={loading} styleButton={TypeButton.DANGER} />
            
        </div>
    )
}

export default DeleteFile