import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Link } from "react-router-dom";
import EntriesList from "../../components/EntriesList";
import "./index.scss"

const EntriesPage: React.FC = () => {

    const { infoUser } = useTypedSelector(state => state.user)

    return (
        <div className="entries">
            <div className="entries__top">
                <h2 className="entries__title">Все посты</h2>
                {
                    infoUser ?
                        <div className="btn-load__wrapper">
                            <Link to="/create-entry" className="btn btn-primary btn-lg btn-load">Загрузить пост</Link>
                        </div>
                        : null
                }
            </div>

            <EntriesList />
        </div>
    )
}

export default EntriesPage


