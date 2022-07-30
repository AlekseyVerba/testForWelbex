import React from "react"
import { SERVER_URL } from "../../constants"
import ReactPlayer from 'react-player'

interface IProp {
    url: string
}

const Video: React.FC<IProp> = ({ url }) => {

    return (
        <video src={`${SERVER_URL}/${url}`}  controls={true} />
    )
}

export default Video