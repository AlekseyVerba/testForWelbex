import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { IResponseSuccess } from "../types/response/index.interface"
import { RegistrationOrLoginDto } from "./dto/registration.dto"
import { ValidationPipe } from "../pipes/validation.pipe"
import { AuthGuard } from "../guards/auth.guard"
import { UserProperty } from "../decorators/userProperty.decorator"
import { IUserWithToken } from "../user/user.interface"
import { Entry } from "../entry/entry.entity"

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post("registration")
    async registration( 
        @Body(new ValidationPipe()) registrationDto: RegistrationOrLoginDto
    ): Promise<IResponseSuccess<void>> {

        await this.authService.registration(registrationDto)

        return {
            status: true,
            message: "Успешно"
        }
    }

    @Post("login")
    async login(
        @Body(new ValidationPipe()) loginDto: RegistrationOrLoginDto
    ): Promise<IResponseSuccess<IUserWithToken>> {

        const user = await this.authService.login(loginDto)

        return {
            status: true,
            message: "Успешно",
            data: user
        }
    }

    @Get("check")
    @UseGuards(AuthGuard)
    async check(
        @UserProperty("id") userID: number,
    ): Promise<IResponseSuccess<IUserWithToken>> {
        const userWithToken = await this.authService.check(userID)

        return {
            status: true,
            message: "Успешно",
            data: userWithToken
        }
    }

}