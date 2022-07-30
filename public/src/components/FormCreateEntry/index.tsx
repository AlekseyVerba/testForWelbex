import { useHttp } from "hooks/useHTTP"
import React, { ChangeEvent, useState } from "react"
import { RequestPostEnum, RequestPutEnum } from "reguestEnums"
import { IEntry } from "types/entry.interface"
import { IResponseSuccess } from "types/responses/index.interface"
import FormCreateEntry from "./FormCreateEntry"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const FormCreateEntryWrapper: React.FC = () => {

    const { editEntry } = useTypedSelector(state => state.entry)
    const [files, setFiles] = useState<FileList | null>(null)
    const [inputMessage, setInputMessage] = useState<string>(editEntry?.message || "")
    const { request, loading } = useHttp<IResponseSuccess<IEntry>>()
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const isCreate = editEntry ? false : true

    const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            setFiles(event.target.files)
        }
        
    }

    const onChangeValueMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(event.target.value)
    }

    const createSubmit = async (event: Event) => {
        event.preventDefault()

        const formData = new FormData()


        if (files) {
            for (const file of files) {
                formData.append('files', file, file.name);
              }
        }

        if (inputMessage) {
            formData.append('message', inputMessage);
        }

        if (!files && !inputMessage.trim()) {
            alert("Нельзя создать пустой пост")
            return
        }
  
        const url = isCreate ? RequestPostEnum.CREATE_ENTRY :  `${RequestPutEnum.UPDATE_ENTRY}/${editEntry!.id}`
        
        const res = await request(url, isCreate ? "POST" : "PUT", formData, {}, true)
        debugger
        if (res.status) {
            setSuccess(res.message)
            setInputMessage("")
            setTimeout(() => {
                setSuccess(null)
            }, 2000)
        } else {
            setError(res.message)
            setInputMessage("")
            setTimeout(() => {
                setError(null)
            }, 2000)
        }
        setFiles(null)

    }

    return <FormCreateEntry createSubmit={createSubmit} inputMessage={inputMessage}
                            loadFile={loadFile} onChangeValueMessage={onChangeValueMessage}
                            loading={loading} success={success} error={error} isCreate={isCreate}
            />

}

export default FormCreateEntryWrapper