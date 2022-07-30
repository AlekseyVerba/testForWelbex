import Express from "express"
import { IUserFromToken } from "../../user/user.interface"

declare global {
    namespace Express {
        interface Request {
            user?: IUserFromToken
        }
    }
}