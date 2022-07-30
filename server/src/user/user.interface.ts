import { User } from "./user.entity"

export type IUser = Omit<User, "password" | "hashPassword">

export interface ICreateUser {
    name: string
    password: string
}

export interface IUserWithToken {
    user: IUser,
    token: string
}

export interface IUserFromToken {
    id: number
    name: string
}