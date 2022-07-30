import React, { useEffect } from "react"
import BigLoader from "../BigLoader"
import { useActions } from "../../hooks/useActions"

import { useHttp } from "../../hooks/useHTTP"
import "./index.scss"
import { IResponseFail, IResponseSuccess } from "../../types/responses/index.interface"
import { IUserWithToken } from "../../types/user.interface"
import { RequestGetEnum } from "../../reguestEnums"
import { isIResponseSuccess } from "../../typeGuards"
import { currentUserStorage } from "../../constants"

const CheckAuth: React.FC = () => {

    const { request } = useHttp<IResponseSuccess<IUserWithToken> | IResponseFail>()
    const { ActionCheck, ActionLogin } = useActions()

    useEffect(() => {
        const start = async () => {

            const data = await request(RequestGetEnum.AUTH, "GET", null)
            
            if (data.status && isIResponseSuccess<IUserWithToken>(data)) {
                const { token, user } = data.data!
                localStorage.setItem(currentUserStorage, token)
                ActionLogin(user)
            }
            ActionCheck()
        }
        start()
    }, [])

    return (
        <div className="check">
            <div className="check__wrapper">
            <BigLoader />
            </div>
        </div>
    )
}

export default CheckAuth