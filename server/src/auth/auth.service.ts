import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { UserService } from "../user/user.service"
import { IUser, IUserWithToken } from "../user/user.interface"
import { RegistrationOrLoginDto } from "./dto/registration.dto"
import { IResponseFail } from "../types/response/index.interface"
import { compare } from "bcryptjs"
import { JwtService } from "../jwt/jwt.service"

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async registration(registrationDto: RegistrationOrLoginDto): Promise<IUser> {


        const user = await this.userService.createUser(registrationDto)
        return user
    }

    async login({name, password}: RegistrationOrLoginDto): Promise<IUserWithToken> {

        const candidate = await this.userService.findUserByEmailWithPassword(name)

        if (!candidate) {
            const objError: IResponseFail = {
                status: false,
                message: "Неверные данные"
            }

            throw new BadRequestException(objError)
        }

        const isEqualPasswords = await compare(password, candidate.password)

        

        if (!isEqualPasswords) {
            const objError: IResponseFail = {
                status: false,
                message: "Неверные данные"
            }

            throw new BadRequestException(objError)
        }

        const token = this.jwtService.createJWT({
            payload: {
                id: candidate.id,
                name: candidate.name
            }
        })

        const userWithoutPassword =  this.userService.removePassword(candidate)

        return {
            user: userWithoutPassword,
            token
        }

    }

    async check(userID: number): Promise<IUserWithToken> {

        const candidate = await this.userService.findUserByID(userID)

        if (!candidate) {
            const objError: IResponseFail = {
                status: false,
                message: "Пользователь с данным id не найден"
            }

            throw new NotFoundException(objError)
        }

        const token = this.jwtService.createJWT({
            payload: {
                id: candidate.id,
                name: candidate.name
            }
        })

        return {
            user: candidate,
            token
        }

    }


}