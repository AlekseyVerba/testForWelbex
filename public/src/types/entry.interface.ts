import { IUser } from "./user.interface"

export interface IEntry {
    id: number
    message: string
    files: string[]
    createdAt: Date
    user: IUser
}