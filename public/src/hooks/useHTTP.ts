import { useCallback, useState } from "react"
import { SERVER_URL, currentUserStorage } from "../constants"


interface returnObject<RETURN_DATA> {
    loading: boolean;
    error: string | null;
    request: (url:string, method: string, body: Record<string, any> | null | FormData, 
            init?:RequestInit, isFormData?:boolean) => Promise<RETURN_DATA>
}


export function useHttp<RETURN_DATA>(): returnObject<RETURN_DATA> {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setErrors] = useState<null | string>(null)

    
    const request = useCallback(async (url:string,  method: string, 
                                        body: Record<string, any> | null | FormData, 
                                        init: RequestInit = {},
                                        isFormData?:boolean): Promise<RETURN_DATA> => {

        const token = localStorage.getItem(currentUserStorage) || ""

        
        

        
       

        init.headers = {
            'Authorization': 'Bearer ' + token,
        }
        

        if (body && !isFormData) {
            init.body = JSON.stringify(body)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            init.headers["Content-Type"] = "application/json"
        }


        if (body && isFormData && body instanceof FormData) {
            init.body = body
        }

        init.method = method


        setLoading(true)
        try {
            const response = await fetch(`${SERVER_URL}/${url}`, init)

            
            const data = await response.json()


            setLoading(false)
            return data
        } catch(e) {
            console.log(e)
            setLoading(false)
            setErrors(`${e}`)
            throw new Error(`${e}`)
        }
    }, []) as unknown as (url:string, method: string, body: Record<string, any> | null | FormData, 
                        init?:RequestInit, isFormData?:boolean) => Promise<RETURN_DATA>


    return { loading, error, request }
}


