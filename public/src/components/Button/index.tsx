import React from "react";
import { TypeButton } from "../../types/button.interface"
import SmallLoader from "../SmallLoader"


interface IProp {
    disabled?: boolean
    styleButton?: TypeButton
    text: string,
    type?: 'submit' | 'reset' | 'button',
    event?: (...args: any[]) => any
    loading?: boolean
}

const Button: React.FC<IProp> = ({ text, loading, disabled = false, styleButton = TypeButton.PRIMARY, type = "button", event }) => {

    return (
        <button onClick={event} type={type} className={`btn ${styleButton} ${disabled || loading ? "disabled" : ""}`}>
          <span>{text}</span>  
          {loading && <SmallLoader /> }
          
        </button>
    )
}

export default Button

