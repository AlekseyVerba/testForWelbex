import React, {useState} from "react"
import useInput from "../../hooks/useInput"
import Form from "./form"
import "./index.scss"
import { useHttp } from "../../hooks/useHTTP"
import { RequestPostEnum } from "../../reguestEnums/"
import { IResponse, IResponseFail, IResponseSuccess } from "../../types/responses/index.interface"
import { IUserWithToken } from "../../types/user.interface"
import { isIResponseSuccess } from "../../typeGuards/"
import { currentUserStorage } from "../../constants/"
import { useActions } from "../../hooks/useActions"

interface IProp {
    type: "registration" | "login"
}

const FormWrapper: React.FC<IProp> = ({ type }) => {

    const title = type === "registration" ? "Регистрация" : "Авторизация"
    const textButton = type === "registration" ? "Зарегистрироваться" : "Войти"
    const pathToLink = type === "registration" ? "/form/login" : "/form/registration"

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const { loading: registerLoading, request: requestRegister } = useHttp<IResponse>()
    const { loading: loginLoading, request: requestLogin } = useHttp<IResponseSuccess<IUserWithToken> | IResponseFail>()

    const { ActionLogin } = useActions()

    const nameInput = useInput("", {
        lengthMin: {
            value: 3, 
            message: "Минимальная длина 3 символа"
        }
    })

    const passwordInput = useInput("", {
        lengthMax: {value: 15, message: "Максимальная длина 15 символов"},
        lengthMin: {value: 3, message: "Минимальная длина 3 символа"}
    })

    const clearInputs = () => {
        nameInput.clearValue()
        passwordInput.clearValue()
    }

    const submitFormRegistration = async (event: MouseEvent) => {
        event.preventDefault()
        const {status, message} = await requestRegister(RequestPostEnum.REGISTRATION, "POST" ,{
            name: nameInput.value,
            password: passwordInput.value
        })
    
        if (status) {
            setSuccess(message)
            clearInputs()
            setTimeout(() => {
                setSuccess(null)
            }, 2000)
        } else {
            setError(message)
            clearInputs()
            setTimeout(() => {
                setError(null)
            }, 2000)
        }

    }

    const submitFormLogin = async (event: MouseEvent) => {
        event.preventDefault()
        const data = await requestRegister(RequestPostEnum.LOGIN, "POST" ,{
            name: nameInput.value,
            password: passwordInput.value
        })

        if (data.status && isIResponseSuccess<IUserWithToken>(data)) {
            const { token, user } = data.data!
            localStorage.setItem(currentUserStorage, token)
            ActionLogin(user)
        } else {
            setError(data.message)
            clearInputs()
            setTimeout(() => {
                setError(null)
            }, 2000)
        }

    }

    return <Form title={title} textButton={textButton} 
            submitFunc={type === "registration" ? submitFormRegistration : submitFormLogin} nameInput={nameInput} 
            passwordInput={passwordInput} link={pathToLink}
            loading={registerLoading}
            error={error}
            success={success}
            />
}

export default FormWrapper