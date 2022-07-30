import React from "react"
import FormCreateEntry from "../../components/FormCreateEntry"
import { Link } from "react-router-dom"
import "./index.scss"

const CreateEntryPage = () => {

    return (
        <div className="create-post-page">
            <h1>Создание поста</h1>
            <FormCreateEntry />
            <Link to="/">Перейти к постам</Link>
        </div>
    )
}

export default CreateEntryPage