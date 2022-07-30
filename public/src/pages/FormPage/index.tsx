import React from "react"
import { useParams } from "react-router-dom"
import Form from "../../components/Form"
import "./index.scss"

interface IProp {
    type: "registration" | "login"
}

const FormPage: React.FC<IProp> = ({type}) => {


    return (
        <div className="form-page">
            <Form type={type} />
        </div>
    )
}

export default FormPage