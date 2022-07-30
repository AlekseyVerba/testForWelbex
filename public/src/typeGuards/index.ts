import { IResponseSuccess, IResponseFail } from "../types/responses/index.interface"

export function isIResponseSuccess<DATA>(data: IResponseSuccess<DATA> | IResponseFail): data is IResponseSuccess<DATA> {
    return "data" in data
}