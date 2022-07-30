import React, { HTMLInputTypeAttribute } from "react"

interface IProp {
    nameLabel?: string
    typeInput?: HTMLInputTypeAttribute
    placeholder?: string
    additionalClass?: string
    value: string
    validSuccessMessage?: string | null
    validErrorMessage?: string | null
    change: (event: any) => void
    blur?: (event: any) => void
    isClearBlur?: boolean
}

const Input: React.FC<IProp> = ({ additionalClass = "", nameLabel = "",
    placeholder = "", typeInput = "text",
    change, value, validSuccessMessage = "Успешно", validErrorMessage,
    blur, isClearBlur
}) => {

    return (
        <div className="form-group">
            <label className="col-form-label mt-4">
                <span>{nameLabel}</span>

                <input onBlur={(event) => blur ? blur(event) : ""} type={typeInput}
                    className={`form-control ${isClearBlur ? validErrorMessage !== undefined ? "is-invalid" : "is-valid" : ""} ${additionalClass}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={change}
                />
                <div className="invalid-feedback">{validErrorMessage}</div>
                <div className="valid-feedback">{validSuccessMessage}</div>
            </label>
        </div>
    )
}

export default Input