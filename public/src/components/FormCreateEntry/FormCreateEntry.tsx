import Button from "../Button"
import React, { ChangeEvent } from "react"
import { TypeButton } from "types/button.interface"

interface IProp {
    onChangeValueMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void
    loadFile: (e: ChangeEvent<HTMLInputElement>) => void
    inputMessage: string
    createSubmit: (e: Event) => void
    loading: boolean
    success: string | null
    error: string | null
    isCreate: boolean
}

const FormCreateEntry: React.FC<IProp> = ({ createSubmit, inputMessage, 
                                            loadFile, onChangeValueMessage,
                                            error, loading, success, isCreate }) => {

    return (
        <div>
            <div className="form-group">
                <label className="form-label mt-4">
                    <span>Текст поста</span>
                
                <textarea className="form-control" onChange={(e) => onChangeValueMessage(e)} 
                            value={inputMessage} rows={3}></textarea>
                </label>
            </div>
            <div className="form-group">
                <label  className="form-label mt-4">
                    <span>Файлы</span>
                
                <input accept=".png, .jpg, .jpeg,video/*" onChange={(e) => loadFile(e)}  
                className="form-control" type="file" multiple={true} />
                </label>
            </div>
            {error && <div className="danger">{error}</div>}
            {success && <div className="success">{success}</div>}
            <Button loading={loading} text={isCreate ? "Создать" : "Редактировать"} type="submit" styleButton={TypeButton.SUCCESS} event={createSubmit} />
        </div>
    )
}

export default FormCreateEntry