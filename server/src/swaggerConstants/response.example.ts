import { User } from "../user/user.entity"

export class Response {
    status: boolean
    message: string
}

export class ResponseSuccess<T> {
    status: boolean
    message: string
    data: T
}