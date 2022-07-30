import useInput from "../../hooks/useInput"

export interface IvalidateOptions {
    lengthMin?: {
        value: number,
        message?: string
    },
    lengthMax?: {
        value: number,
        message?: string
    },
    isEmail?: {
        message?: string 
    },
    isString?: {
        message?:string
    },
    isAplha?: {
        message?: string
    }
}

export type IDataUseInput = ReturnType<typeof useInput>