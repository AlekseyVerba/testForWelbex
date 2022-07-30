import React from "react"
import Input from "../Input"
import Button from "../Button"
import { IDataUseInput } from "../../types/hooks/useInput"
import { Link } from "react-router-dom"

interface IProp {
    title: "Регистрация" | "Авторизация"
    textButton: "Зарегистрироваться" | "Войти"
    submitFunc: (event: any) => any
    nameInput: IDataUseInput
    passwordInput: IDataUseInput
    link: string
    loading: boolean
    error: null | string
    success: null | string
}

const Form: React.FC<IProp> = ({
    submitFunc, textButton, title,
    nameInput, passwordInput, link,
    loading, error, success
}) => {

    const buttonIsDisabled = !passwordInput.errors && !nameInput.errors

    return (
        <div className="form">
            <h3>{title}</h3>
            <form>
                <Input nameLabel="Имя" value={nameInput.value}
                    validErrorMessage={nameInput.errors}
                    blur={nameInput.handlerChangeBlur}
                    change={nameInput.changeHadnlerInput}
                    placeholder="Имя"
                    isClearBlur={nameInput.isClearBlur}
                />
                <Input nameLabel="Пароль" value={passwordInput.value}
                    validErrorMessage={passwordInput.errors}
                    blur={passwordInput.handlerChangeBlur}
                    change={passwordInput.changeHadnlerInput}
                    typeInput="password" placeholder="Пароль"
                    isClearBlur={passwordInput.isClearBlur}
                />
                {error && <div className="danger">{error}</div>}
                {success && <div className="success">{success}</div>}
                
                <div className="form__button">
                    <Button event={submitFunc} loading={loading} disabled={!buttonIsDisabled}  text={textButton} />
                </div>
                <Link to={link}>{textButton === "Зарегистрироваться" ? "Войти" : "Зарегистрироваться"}</Link>
            </form>
        </div>
    )
}

export default Form