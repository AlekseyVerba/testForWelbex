import React from "react"
import DeleteFile from "../DeleteFile"

interface IProp {
    files: string[]
    id: number
}

const DeleteFiles: React.FC<IProp> = ({ files, id }) => {

    return <>{files.map(file => <DeleteFile id={id} url={file} />)}</>

}

export default DeleteFiles