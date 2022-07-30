import React from "react"
import { SERVER_URL } from "../../constants"

interface IProp {
    url: string
    alt?: string
}

const Image: React.FC<IProp> = ({ url, alt }) => {

    return (
        <img src={`${SERVER_URL}/${url}`} alt={alt ? alt : "photo"}/>
    )
}

export default Image