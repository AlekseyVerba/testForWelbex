import React from "react"
import Button from "../../Button"
import { TypeButton } from "../../../types/button.interface"
import { Link } from "react-router-dom"

interface IProp {
    deleteEntry: () => void
    loadingDelete: boolean
    id: number
}

const EntryBottom: React.FC<IProp> = ({ deleteEntry, loadingDelete, id }) => {

    return (
        <div className="card-bottom">
            <Link to={`/edit-entry/${id}`}>
                <Button text="Редактировать" styleButton={TypeButton.INFO} />
            </Link>
            <Button text="Удалить" event={deleteEntry} loading={loadingDelete} styleButton={TypeButton.DANGER} />
        </div>
    )
}

export default EntryBottom