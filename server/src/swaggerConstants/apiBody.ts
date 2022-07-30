import { RegistrationOrLoginDto } from "src/auth/dto/registration.dto";

export const apiBodyRegister = { 
    description: "Регистрация нового пользователя",
    required: true,
    type: RegistrationOrLoginDto,
    examples: {
        first: {
            value: {
                name: "qwert",
                password: "sasafa12"
            }
        }
    }
}